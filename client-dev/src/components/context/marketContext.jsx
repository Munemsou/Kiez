import { createContext, useEffect, useState } from "react";

export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const savedMarketItems = JSON.parse(localStorage.getItem("marketData"));

  console.log("saveDDDmarketItem$$$ ->", savedMarketItems); // -> null

  const [marketData, setMarketData] = useState(savedMarketItems || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("marketData in conteXXXt:", marketData); // -> null

  useEffect(() => {
    if (marketData !== null) {
      localStorage.setItem("marketData", JSON.stringify(marketData));
    }
  }, [marketData]);

  return (
    <MarketContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, marketData, setMarketData }}
    >
      {children}
    </MarketContext.Provider>
  );
};
