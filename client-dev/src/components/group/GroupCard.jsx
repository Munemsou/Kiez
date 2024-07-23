import { useContext, useEffect, useState } from "react";
import groupPlaceholderImg from "../assets/groupPlaceholder.jpg";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  const { title, text, image, privateGroup, members, mods, admins } = group;
  const { userData, setUserData } = useContext(UserContext);
  const userId = userData._id;
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    console.log("groupID UE", groupId);
  }, [groupId]);

  const updateGroupId = () => {
    setGroupId(group._id);
  };
  /******************************************************
   *    Berechnung Anzahl der Gruppenmitglieder
   ******************************************************/
  const countGroupMembers = () => {
    // Zähle Länge jedes Arrays
    const numMembers = members ? members.length : 0;
    const numMods = mods ? mods.length : 0;
    const numAdmins = admins ? admins.length : 0;

    // Berechne die Gesamtzahl der Gruppenmitglieder
    const total = numMembers + numMods + numAdmins;

    return total;
  };

  /******************************************************
   *    überprüfung ob User mitglied der Gruppe ist
   ******************************************************/
  const isMember = () => {
    const isMember = Array.isArray(members) && members.includes(userId);
    const isMod = Array.isArray(mods) && mods.includes(userId);
    const isAdmin = Array.isArray(admins) && admins.includes(userId);

    return isMember || isMod || isAdmin;
  };

  /******************************************************
   *    Wenn kein bild hinterlegt wurde -> Platzhalter nutzen
   ******************************************************/
  //! muss an Cloudinary angeschlossen werden
  const groupImage = () => {
    if (!image) {
      return groupPlaceholderImg;
    } else {
      return image;
    }
  };

  /******************************************************
   *    Ausgabe Private oder Öffentliche Gruppe
   ******************************************************/
  const isPrivate = () => {
    if (privateGroup) {
      return "Private Gruppe";
    } else {
      return "Öffentliche Gruppe";
    }
  };

  /******************************************************
   *    Gruppe Beitreten Button
   ******************************************************/
  const joinGroupBtnHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/followGroup/${groupId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      console.log("Updated User in gruppe beitreten button ", responseData);
      setUserData(responseData);
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  return (
    <li
      key={title}
      className="reusableBorder reusableBlur mt-4 p-2 flex flex-col w-full"
    >
      <div onClick={updateGroupId} className=" flex w-full">
        {/* Linke Seite */}
        <div className="flex-none w-1/4 mr-4">
          <Link to={`/groupsCompo/${group._id}`}>
            <img src={groupImage()} alt="Group Image" className="h-20 w-20" />
          </Link>
        </div>

        {/* Mittlere Spalte */}
        <div className="flex-grow" style={{ flexBasis: "55%" }}>
          <Link to={`/groupsCompo/${group._id}`}>
            <h2 className="text-lg font-bold mt-2 mb-4">{title}</h2>
          </Link>

          <p>{text}</p>
        </div>
        {/* Rechte Seite */}
        <aside className="flex-none" style={{ flexBasis: "15%" }}>
          {isMember() ? (
            /* Häkchen Icon */

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          ) : (
            <div onClick={joinGroupBtnHandler}>
              {/* Beitreten Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>

              <a href="#">Beitreten</a>
            </div>
          )}
        </aside>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-200 w-full">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          <p>{countGroupMembers()}</p>
          <span className="ml-4">{isPrivate()}</span>
        </span>
      </div>
    </li>
  );
};

export default GroupCard;
