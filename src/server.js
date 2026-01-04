import 'dotenv/config';
import app from './app.js';
import config from './config.js';
import { validateEnvVars } from './utils/env-validation.js';

try {
  validateEnvVars();
} catch (error) {
  console.error('Environment validation failed:', error.message);
  process.exit(1);
}

const { server } = config;

if (server.env !== 'production') {
  const PORT = server.port;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
