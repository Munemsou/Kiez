import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

/*
ALLG: 
- userDaten und Login-Status werden über useContext() für alle 
  Komponenten im Projekt verfügbar 
- children sind alle Komponenten/Features im Projekt
*/

export const UserProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("userData"));

  // Ensure userData has a default structure
  const [userData, setUserData] = useState(savedUser || { groups: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(!!savedUser);

  useEffect(() => {
    console.log("useEffect löst aus");
    if (userData !== null) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
    }
  }, [userData]);

  console.log({ userData });

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
