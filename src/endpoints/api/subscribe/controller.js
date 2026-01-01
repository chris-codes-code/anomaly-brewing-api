import { createError, createErrorResponse, createResponse } from '../../../utils/response.js';
import { validateEmail, sanitizeString } from '../../../utils/validation.js';
import config from '../../../config.js';

const mapNewsletterResult = (data) => {
  const isSubscribed = data.status === 'SUBSCRIBED';
  const alreadyExists = data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS';

  if (isSubscribed || alreadyExists) {
    return createResponse({ success: true }, 200);
  }

  return createErrorResponse('Failed to subscribe to newsletter', 500);
};

const postSubscribeController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) throw createError('Email is required', 400);

    // Validate and sanitize email
    validateEmail(email);
    const sanitizedEmail = sanitizeString(email, 254);

    const response = await fetch(config.emailOctopus.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: config.emailOctopus.apiKey,
        email_address: sanitizedEmail,
        status: 'SUBSCRIBED',
      }),
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json();

    const mappedResult = mapNewsletterResult(result);

    return res.status(mappedResult.status).json(mappedResult);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    const status = error.status || 500;
    const message = error.message || 'Error subscribing to newsletter';
    return res.status(status).json(createErrorResponse(message, status));
  }
};

export { postSubscribeController };
