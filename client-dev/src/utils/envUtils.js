// src/utils/envUtils.js

// Determine the base URL based on the environment
export const getBaseUrl = () => {
  const isProduction = import.meta.env.MODE === "production";
  console.log("isProduction:", isProduction);
  return isProduction
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_LOCAL;
};
