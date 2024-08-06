// src/utils/envUtils.js

// Determine the base URL based on the environment
export const getBaseUrl = () => {
    const isDevelopment = import.meta.env.MODE === 'development';
    return isDevelopment
      ? import.meta.env.VITE_API_URL_LOCAL
      : import.meta.env.VITE_API_URL_PROD;
  };
  