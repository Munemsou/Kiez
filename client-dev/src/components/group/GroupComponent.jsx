import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "../context/groupsContext.jsx";
import { useContext, useEffect, useState } from "react";
import groupPlaceholderImg from "../assets/groupPlaceholder.jpg";
import { Modal } from "../mainComponents/createPost-Components/Modal.jsx";
import GroupPostCard from "./GroupPostCard.jsx";
import "../reuseable/styles/reusableGlobal.css";
import "../reuseable/styles/reusableFormComponents.css";
import MitteilungForm from "../mainComponents/createPost-Components/MitteilungForm.jsx";
import Avatar from "../../../public/avatar-placeholder.png";

const GroupComponent = () => {
  const { groupId } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const { groupsData, isLoading } = useContext(GroupsContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(groupsData);

  // Die Logik zum Finden deiner Gruppe basierend auf `groupId`
  const group = groupsData.find((group) => group._id === groupId);
  console.log("group in GroupComponent", group);
  const [groupPosts, setGroupPosts] = useState([]);

  useEffect(() => {
    if (group && group.groupPosts) {
      setGroupPosts(group.groupPosts);
    }
  }, [group]);

  //userdaten für das ProfilBild
  const user = JSON.parse(localStorage.getItem("userData"));

  /******************************************************
   *    damit beim Betreten der Gruppe oben angezeigt wird und nicht irgendwo die mitte
   ******************************************************/
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /******************************************************
   *    useEffect für setGroupPosts
   ******************************************************/

  useEffect(() => {}, [groupPosts]);

  /* *****************************************************
   *    Gruppenkommentare laden (funzt eventuell garnicht?!)
   ******************************************************/
  if (isLoading) {
    return <div>Lädt...</div>; // Zeige eine Ladeanzeige
  }

  if (!groupsData) {
    return <div>Keine Daten verfügbar.</div>; // Fallback, falls keine Daten geladen werden konnten
  }

  const {
    /* title, text, admins, mods, members, privateGroup, comments,  */ image,
  } = group;
  console.log("group in Component", group);

  /******************************************************
   *    img
   ******************************************************/
  // ! Cloudenary Anbindung fehlt noch
  const groupImg = () => {
    if (image === "") {
      return groupPlaceholderImg;
    } else {
      return image;
    }
  };

  /******************************************************
   *    Details ein und ausblenden
   ******************************************************/
  const detailsHandler = () => {
    setShowDetails(!showDetails);
  };

  /******************************************************
   *    mods, Admins und Members Namen formatieren
   ******************************************************/
  const formatNamesList = (users) => {
    // Überprüfe, ob das übergebene Array gültig ist
    if (!Array.isArray(users) || users.length === 0) {
      return "Keine Benutzer vorhanden";
    }

    // Gehe durch jedes Benutzerobjekt im Array und formatiere den Namen
    const formattedNames = users.map((user) => {
      // Extrahiere den Vornamen und den ersten Buchstaben des Nachnamens
      const firstName = user.firstName || "";
      const lastNameInitial = user.lastName
        ? user.lastName.charAt(0) + "."
        : "";
      return `${firstName} ${lastNameInitial}`;
    });

    // Verbinde die formatierten Namen zu einem String
    return formattedNames.join(", ");
  };

  /******************************************************
   *    privateGroup
   ******************************************************/
  const isPrivate = () => {
    const status = group.privateGroup;
    if (status) {
      return "Private Gruppe";
    } else {
      return "Öffentliche Gruppe";
    }
  };

  /******************************************************
   *    Modal (create Post in extra Fenster anzeigen)
   ******************************************************/

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /******************************************************
   *    Profilpic
   ******************************************************/
  const profilImg = () => {
    if (user.image === undefined || null) {
      return Avatar;
    } else {
      return user.image;
    }
  };

  return (
    <section className="relative flex flex-col min-h-screen  ">
      {/* Fest positionierter Hintergrund */}
      <div className="absolute inset-0">
        <div className="fixed reusableGlobalBackground "></div>
        <div className="fixed reusableGlobalBackground "></div>
        <div className="fixed reusableGlobalBackground "></div>
      </div>

      {/* Scrollbarer Inhalts-Container */}
      <div className="reusableBlur w-full h-full overflow-auto min-h-screen">
        {/* Container für die gesamte Gruppenansicht, einschließlich Gruppeninfos und Kommentaren */}
        <div className="mx-auto flex flex-col items-center">
          <Link to={`/groups`}>
            <p className="reusableFormBtn mb-4 text-center">
              Zurück zur Gruppenübersicht
            </p>
          </Link>

          {/* Verwendung der reusableContainer Klasse für den Glassmorphismus-Stil */}
          <div className="reusableContainer  max-w-4xl ">
            <h3 className="reusableH3 text-xl font-semibold mb-4 pb-2 border-b-2 w-full px-4 py-2 mt-5">
              {group.title}
            </h3>
            <img
              src={groupImg()}
              alt="Gruppenbild"
              className="object-cover mx-auto mb-4"
              style={{
                maxWidth: "800px",
                maxHeight: "600px",
                width: "100%",
                height: "auto",
              }}
            />

            <div className="flex justify-between mb-4">
              <button
                onClick={detailsHandler}
                className="reusableFormBtn h-10 mr-3"
              >
                {!showDetails ? "Details einblenden" : "Details ausblenden"}
              </button>
              <button className="reusableFormBtn h-10 ml-3">Menü</button>
            </div>

            {showDetails && (
              <div className="space-y-2">
                <p className="bg-white bg-opacity-50 text-center  p-4 rounded-lg shadow-lg">
                  {group.text}
                </p>

                {showDetails && (
                  <div className="space-y-4 mt-4">
                    <div className="bg-white bg-opacity-10 p-1 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-1">Admins</h4>
                      <p>{formatNamesList(group.admins)}</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-1 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-1">Mods</h4>
                      <p>{formatNamesList(group.mods)}</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-1 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-1">Mitglieder</h4>
                      <p>{formatNamesList(group.members)}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Tags und Privatsphäre-Status */}
            <div className="p-2 flex justify-between">
              <span>{isPrivate()}</span>
              <span>{group.tags}</span>
            </div>
          </div>
        </div>

        {/* Sektion für neue Nachricht */}
        <section onClick={openModal} className=" my-4">
          <div className="reusableHeaderBar mx-auto max-w-3xl p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg flex items-center space-x-4">
            <img
              src={profilImg()}
              alt="Profilbild Nutzer"
              className="rounded-full w-14 h-14 object-cover"
            />
            <input
              type="text"
              className="flex-grow  border border-white-500 p-2 rounded-lg focus:ring-2"
              placeholder="Schreib ein Kommentar..."
            />
          </div>
        </section>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <MitteilungForm
              closeModal={closeModal}
              groupId={groupId}
              setGroupPosts={setGroupPosts}
              groupPosts={groupPosts}
            />
          </Modal>
        )}

        {/* Container für die Post-Karten (Kommentare) innerhalb des gleichen scrollbaren Containers */}
        <div className="mt-4 px-4 md:px-0 max-w-3xl mx-auto">
          {groupPosts
            .slice()
            .reverse()
            .map((post, index) => (
              <GroupPostCard key={post._id || index} post={post} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default GroupComponent;
