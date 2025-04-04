import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import UserLogout from "../user/UserLogout.jsx";

export const DropDownProfile = () => {
  const [hideProfile, setHideProfile] = useState(true);

  // close menu  when clicking outside of it
  const profileRef = useRef();
  const imgRef = useRef();

  const handleDrop = () => {
    // console.log("hideProfile", hideProfile);
    setHideProfile((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Überprüfe, ob der Klick innerhalb des Profilbereichs erfolgt ist
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        imgRef.current &&
        !imgRef.current.contains(e.target)
      ) {
        // Wenn außerhalb geklickt wurde, verstecke das Profil-Dropdown
        setHideProfile(true);
      }
    };

    window.addEventListener("click", handleClickOutside);

    // Cleanup-Funktion, um den Event-Listener zu entfernen
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []); // Abhängigkeiten array ist leer, da wir nur beim Mounten/Unmounten handeln wollen

  return (
    <div className="nav-items flex items-center gap-4" onClick={handleDrop}>
      <button ref={imgRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 btn-profile"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      {hideProfile ? (
        <div className="absolute w-fit top-12 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Invisible placeholder to keep space */}
        </div>
      ) : (
        <div
          className="absolute w-min top-14 right-16 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 "
          ref={profileRef}
        >
          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-300 dark:hover:text-slate-50">
              <NavLink to="/profile" className="block">
                Profile
              </NavLink>
            </li>
           {/*  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </li> */}
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-slate-300 dark:hover:text-slate-50">
              <NavLink to="/logout" onClick={UserLogout} className="block">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
