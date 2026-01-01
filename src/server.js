import 'dotenv/config';
import app from './app.js';
import config from './config.js';
import { validateEnvVars } from './utils/env-validation.js';

// Validate required environment variables on startup
try {
  validateEnvVars();
} catch (error) {
  console.error('Environment validation failed:', error.message);
  process.exit(1);
}

const { server } = config;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = server.port;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// For Vercel
export default app;
