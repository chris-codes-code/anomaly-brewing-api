const requiredEnvVars = [
  'DATOCMS_API_TOKEN',
  'CORS_ORIGIN',
  'EMAIL_OCTOPUS_API_KEY',
  'EMAIL_OCTOPUS_API_ENDPOINT',
  'SHOPIFY_STORE_DOMAIN',
  'SHOPIFY_PUBLIC_ACCESS_TOKEN',
  'SHOPIFY_API_VERSION',
];

const validateEnvVars = () => {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.',
    );
  }
};

export { validateEnvVars };

