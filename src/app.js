import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import routes from './router.js';
import config from './config.js';
import { createErrorResponse } from './utils/response.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  methods: config.cors.methods,
  credentials: config.cors.credentials,
}));
// Request body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve favicon.ico
app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));

// Health check route at base URL
app.get('/', (req, res) => {
  res.json({ success: true });
});

// Routes
app.use(routes);

// 404 catch-all route (must come before error handling middleware)
app.use('*', (req, res) => {
  return res.status(404).json(createErrorResponse('Resource not found', 404));
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
