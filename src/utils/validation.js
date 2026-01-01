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

const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required and must be a string');
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Additional length check
  if (email.length > 254) {
    throw new Error('Email address is too long');
  }

  return true;
};

const sanitizeString = (str, maxLength = 10000) => {
  if (typeof str !== 'string') {
    return '';
  }

  // Remove null bytes and trim
  let sanitized = str.replace(/\0/g, '').trim();

  // Enforce max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

export { validateRequiredParams, validateLocale, validateSlug, validateEmail, sanitizeString };
