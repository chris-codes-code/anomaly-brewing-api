const requiredEnvVars = [
  'DATOCMS_API_TOKEN',
  'WEB_3_FORMS_ACCESS_KEY',
  'WEB_3_FORMS_API_ENDPOINT',
  'EMAIL_OCTOPUS_API_KEY',
  'EMAIL_OCTOPUS_API_ENDPOINT',
  'CORS_ORIGIN',
];

const validateEnvVars = () => {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
};

export { validateEnvVars };

