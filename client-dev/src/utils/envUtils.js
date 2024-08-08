// src/utils/envUtils.js
export const getBaseUrl = () => {
  const mode = import.meta.env.MODE;
  const isDevelopment = mode === 'development';
  console.log("Environment Mode:", mode);
  console.log("Is Development:", isDevelopment);
  console.log("API URL Local:", import.meta.env.VITE_API_URL_LOCAL);
  console.log("API URL Prod:", import.meta.env.VITE_API_URL_PROD);
  return isDevelopment
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;
};
  