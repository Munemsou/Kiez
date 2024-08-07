// src/utils/envUtils.js

export const getBaseUrl = () => {
  const isDevelopment = import.meta.env.MODE === 'development';
  console.log("Environment Mode:", import.meta.env.MODE); // Debug log
  console.log("Is Development:", isDevelopment); // Debug log
  return isDevelopment
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;
};
