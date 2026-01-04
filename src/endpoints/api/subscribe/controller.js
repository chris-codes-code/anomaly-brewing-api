import { createError, createErrorResponse, createResponse } from '../../../utils/response.js';
import { validateEmail, sanitizeString } from '../../../utils/validation.js';
import { EMAIL_OCTOPUS, HTTP_STATUS, REQUEST_LIMITS } from '../../../utils/constants.js';
import config from '../../../config.js';

const mapNewsletterResult = (data) => {
  const isSubscribed = data.status === EMAIL_OCTOPUS.STATUS.SUBSCRIBED;
  const alreadyExists = data.error?.code === EMAIL_OCTOPUS.ERROR_CODES.MEMBER_EXISTS;

  if (isSubscribed || alreadyExists) {
    return createResponse({ success: true }, HTTP_STATUS.OK);
  }

  return createErrorResponse('Failed to subscribe to newsletter', HTTP_STATUS.INTERNAL_SERVER_ERROR);
};

const postSubscribeController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError('Email is required', HTTP_STATUS.BAD_REQUEST);
    }

    validateEmail(email);
    const sanitizedEmail = sanitizeString(email, 254);

    const response = await fetch(config.emailOctopus.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: config.emailOctopus.apiKey,
        email_address: sanitizedEmail,
        status: EMAIL_OCTOPUS.STATUS.SUBSCRIBED,
      }),
      signal: AbortSignal.timeout(REQUEST_LIMITS.TIMEOUT_MS),
    });

    const result = await response.json();
    const mappedResult = mapNewsletterResult(result);

    return res.status(mappedResult.status).json(mappedResult);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    const status = error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = config.server.env === 'production'
      ? 'Error subscribing to newsletter'
      : error.message || 'Error subscribing to newsletter';
    return res.status(status).json(createErrorResponse(message, status));
  }
};

export { postSubscribeController };
