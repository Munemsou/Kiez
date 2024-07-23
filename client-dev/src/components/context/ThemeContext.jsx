import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const ThemeContext = createContext();

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider =  ({children}) =>{


    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(prevMode => !prevMode);
    };
  
    return <ThemeContext.Provider value={{darkMode,toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
}; 

