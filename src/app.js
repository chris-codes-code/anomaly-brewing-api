import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import routes from './router.js';
import config from './config.js';
import { createErrorResponse } from './utils/response.js';
import { apiRateLimiter, subscribeRateLimiter } from './middleware/rate-limiter.js';
import { REQUEST_LIMITS, HTTP_STATUS } from './utils/constants.js';

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\''],
      scriptSrc: ['\'self\''],
      imgSrc: ['\'self\'', 'data:', 'https:'],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS
app.use(cors({
  origin: config.cors.origin,
  methods: config.cors.methods,
  credentials: config.cors.credentials,
}));

// Request body parsing with size limits
app.use(express.json({ limit: REQUEST_LIMITS.BODY_SIZE }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_LIMITS.BODY_SIZE }));

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(REQUEST_LIMITS.TIMEOUT_MS, () => {
    if (!res.headersSent) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        createErrorResponse('Request timeout', HTTP_STATUS.BAD_REQUEST),
      );
    }
  });
  next();
});

// Serve favicon.ico
app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));

// Health check route
app.get('/', (req, res) => {
  res.json({ success: true });
});

// Rate limiting
app.use('/api/subscribe', subscribeRateLimiter);
app.use(apiRateLimiter);

// Routes
app.use(routes);

// 404 catch-all route
app.use('*', (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json(
    createErrorResponse('Resource not found', HTTP_STATUS.NOT_FOUND),
  );
});

export default app;
