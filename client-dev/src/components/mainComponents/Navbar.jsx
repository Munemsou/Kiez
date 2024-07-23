import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { UserContext } from "../context/userContext.jsx";
import { DropDownProfile } from "./DropDownProfile";
import "./navbar.css";
import Logo from "../assets/SupportStreetLogo.png";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isLoggedIn } = useContext(UserContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <nav
      className={`navbar ${
        darkMode ? "dark-mode" : ""
      } flex justify-between items-center px-4 py-2 fixed top-0 left-0 w-full z-50`}
    >
      <div className="logo-and-title flex items-center">
        <Link className="logo-and-title flex items-center" to="./dashboard">
          <img src={Logo} className="logo-placeholder mr-2" alt="logo" />
          <span>Support Street</span>
        </Link>
      </div>
      <div className="nav-items flex items-center gap-4">
        {/* Dark/Light Mode Toggle */}
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>

        {/* Profil-Dropdown, nur sichtbar wenn eingeloggt */}
        {isLoggedIn && <DropDownProfile />}

        {/* Burger-Menü */}
        <button className="burger-menu" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>

        {menuVisible && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" onClick={toggleMenu}>
                  Home
                </NavLink>
                <NavLink to="/groups" onClick={toggleMenu}>
                  Gruppen
                </NavLink>
                <NavLink to="/market" onClick={toggleMenu}>
                  Marktplatz
                </NavLink>
                <NavLink to="/neighbours" onClick={toggleMenu}>
                  Nachbarschaft
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" onClick={toggleMenu}>
                  Registrieren
                </NavLink>
                <NavLink to="/login" onClick={toggleMenu}>
                  Log In
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
