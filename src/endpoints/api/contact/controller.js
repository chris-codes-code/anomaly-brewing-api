import { createError, createErrorResponse, createResponse } from '../../../utils/response.js';
import { validateEmail, sanitizeString } from '../../../utils/validation.js';
import config from '../../../config.js';

const postContactController = async (req, res) => {
  try {
    const { email, message, name } = req.body;

    if (!email || !message || !name) throw createError('Missing required fields', 400);

    // Validate and sanitize inputs
    validateEmail(email);
    const sanitizedName = sanitizeString(name, 200);
    const sanitizedMessage = sanitizeString(message, 5000);
    const sanitizedEmail = sanitizeString(email, 254);

    const formData = new FormData();

    formData.append('access_key', config.web3Forms.accessKey);
    formData.append('name', sanitizedName);
    formData.append('email', sanitizedEmail);
    formData.append('message', sanitizedMessage);

    const response = await fetch(config.web3Forms.apiEndpoint, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw createError('Web3Forms API error', response.status);

    const result = await response.json();

    if (!result.success) throw createError('Web3Forms API error', response.status);

    return res.status(200).json(createResponse({ success: true }, 200));
  } catch (error) {
    console.error('Error sending contact message:', error);
    const status = error.status || 500;
    const message = error.message || 'Error sending contact message';
    return res.status(status).json(createErrorResponse(message, status));
  }
};

export { postContactController };
