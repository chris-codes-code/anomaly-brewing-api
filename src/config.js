const getCorsOrigin = () => {
  const origin = process.env.CORS_ORIGIN;
  if (!origin) return undefined;

  // Support comma-separated origins or single origin
  return origin.includes(',') ? origin.split(',').map((o) => o.trim()) : origin;
};

export default {
  cors: {
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: (process.env.CORS_METHODS || 'GET,POST,PUT,DELETE,PATCH').split(','),
    origin: getCorsOrigin(),
  },
  datocms: {
    apiToken: process.env.DATOCMS_API_TOKEN,
  },
  defaultLocale: process.env.DEFAULT_LOCALE || 'en',
  emailOctopus: {
    apiKey: process.env.EMAIL_OCTOPUS_API_KEY,
    apiEndpoint: process.env.EMAIL_OCTOPUS_API_ENDPOINT,
  },
  server: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
  },
  shopify: {
    apiVersion: process.env.SHOPIFY_API_VERSION,
    publicAccessToken: process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN,
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  },
};
