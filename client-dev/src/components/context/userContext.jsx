import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

/* WAS HIER PASSIERT:
 1) checke ob user bereits eingeloggt (localStorage.getItem)
 2) wenn eingeloggt (savedUser vorhanden) -> Initialwert = savedUser
 3) wenn nicht, Initialwert = null
 4) in UserLogin.jsx werden userdaten beim Login gesetzt (setUserData)
 5) useEffect speichert userDaten nur dann in localStorage, WENN  
    userData geändert wurde (zB. erster Login || neuer User Login || Login nachdem Cookie abgelaufen ist (30 Tage))


 ALLG: 
 - userDaten und Login-Status werden über useContext() für alle 
   Komponenten im Projekt verfügbar 
 - children sind alle Komponenten/Features im Projekt
*/

export const UserProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("userData"));

  const [userData, setUserData] = useState(savedUser || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("useEffect löst aus");
    if (userData !== null) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("userData"); // Entferne userData aus localStorage, wenn userData null ist
      setIsLoggedIn(false); // Setze isLoggedIn auf false, wenn userData null ist
    }
  }, [userData]);

  useEffect(() => {}, [isLoggedIn]);

  console.log({ userData });

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
