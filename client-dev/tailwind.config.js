/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gray-500": "#d1d5db", // Beispiel für eine benutzerdefinierte Graufarbe
      },
    },
    screens: {
      mobile: "480px",
      // => @media (min-width: 320px) and (@max-width 640px)
      tablet: "641px",
      // => @media (min-width: 641px) and  (@max-device-width: 768px)
      desktop: "768px",
      // => @media (min-width: 768px)
      largeDesktop: "1536px",
    },
  },
  plugins: [],
};
