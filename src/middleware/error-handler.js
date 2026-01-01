import { createErrorResponse } from '../utils/response.js';

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    status: err.status,
    path: req.path,
    method: req.method,
  });

  // Determine status code
  const status = err.status || err.statusCode || 500;

  // Determine error message
  let message = err.message || 'Internal server error';

  // Don't expose internal error details in production
  if (status === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal server error';
  }

  return res.status(status).json(createErrorResponse(message, status));
};

export { errorHandler };

