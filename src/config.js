export default {
  cors: {
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: (process.env.CORS_METHODS || 'GET,POST,PUT,DELETE,PATCH').split(','),
    origin: process.env.CORS_ORIGIN,
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
};
