const validateRequiredParams = (params, requiredFields) => {
  const missingFields = requiredFields.filter(field => !params[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required parameters: ${missingFields.join(', ')}`);
  }

  return true;
};

const validateLocale = (locale) => {
  if (!locale || typeof locale !== 'string') {
    throw new Error('Invalid locale parameter');
  }

  return true;
};

const validateSlug = (slug) => {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug parameter');
  }

  // Basic slug validation (alphanumeric, hyphens, underscores)
  if (!/^[a-zA-Z0-9-_]+$/.test(slug)) {
    throw new Error('Invalid slug format');
  }

  return true;
};

const createValidationError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    throw createValidationError('Email is required and must be a string', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw createValidationError('Invalid email format', 400);
  }

  if (email.length > 254) {
    throw createValidationError('Email address is too long', 400);
  }

  return true;
};

const sanitiseString = (str, maxLength = 10000) => {
  if (typeof str !== 'string') {
    return '';
  }

  // Remove null bytes and trim
  let sanitised = str.replace(/\0/g, '').trim();

  // Enforce max length
  if (sanitised.length > maxLength) {
    sanitised = sanitised.substring(0, maxLength);
  }

  return sanitised;
};

export { validateRequiredParams, validateLocale, validateSlug, validateEmail, sanitiseString };
