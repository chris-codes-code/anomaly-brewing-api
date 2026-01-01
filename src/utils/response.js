const createResponse = (data, status) => ({ data, status });

const createErrorResponse = (message, status) => createResponse({ message }, status);

const createError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export { createResponse, createErrorResponse, createError };
