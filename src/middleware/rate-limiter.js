import rateLimit from 'express-rate-limit';
import { HTTP_STATUS } from '../utils/constants.js';

const createRateLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: { message },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      data: { message },
      status: HTTP_STATUS.BAD_REQUEST,
    });
  },
});

export const apiRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests per window
  'Too many requests, please try again later',
);

export const subscribeRateLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  5, // 5 requests per hour
  'Too many subscription attempts, please try again later',
);

