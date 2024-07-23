import { useState } from "react";
import { useParams } from "react-router-dom";
import "../reuseable/styles/reusableFormComponents.css";
import "../reuseable/styles/reusableGlobal.css";

/* const CreateGroupPost = ({ closeModal, groupPosts, setGroupPosts }) => {
  const { groupId } = useParams();
  console.log(groupId);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    topic: "",
    comments: "",
    likes: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); */

  /******************************************************
   *    handleChange
   ******************************************************/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Bild-Upload übernimmt jetzt handleChange
  /* const handleImageUpload = (e) => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImg(reader.result);
    };
    reader.readAsDataURL(image);
  }; */

  /******************************************************
   *    Senden des Forms
   * und überprüfung der Länge des Betreffs und der Nachricht
   ******************************************************/

  const validateAndSubmitForm = async (e) => {
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Deine Validierungslogik
    if (formData.title.length < 2 || formData.title.length > 50) {
      setErrorMessage("Der Betreff muss zwischen 2 und 50 Zeichen lang sein.");
      return;
    }

    if (formData.text.length < 2 || formData.text.length > 5000) {
      setErrorMessage(
        "Die Nachricht muss zwischen 2 und 5000 Zeichen lang sein."
      );
      return;
    }

    setErrorMessage(""); // Bereinigt eventuelle vorherige Fehlermeldungen

    console.log("Absendendes FormData", formData);

    /******************************************************
     *   Fetch
     ******************************************************/
    try {
      const response = await fetch(
        `http://localhost:5500/createGroupPost/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify() /* formDatagroupForm ans Backend anschließen */,
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Post erfolgreich gespeichert");
        closeModal(); // Schließt das Formular/Modal nach dem erfolgreichen Absenden
      } else {
        console.error("Fehler beim Speichern des Posts");
        setErrorMessage("Es gab ein Problem beim Speichern Ihres Posts.");
      }
      const data = await response.json();
      setGroupPosts([...groupPosts, data.post]);
      console.log("data.post: ", data.post);
    } catch (error) {
      console.error("Fehler beim Senden der Daten", error);
      setErrorMessage("Es gab ein Problem beim Senden Ihrer Daten.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen w-full">
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableContainer reusableBorder mt-12 shadow-md">
        <form
          onSubmit={validateAndSubmitForm}
          className="reusableForm space-y-4"
        >
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Wähle eine Option:</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={closeModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </header>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Betreff"
              value={formData.title}
              onChange={handleChange}
              minLength="2"
              maxLength="50"
              className="reusableInput"
            />
            <textarea
              placeholder="Deine Nachricht"
              name="text"
              value={formData.text}
              onChange={handleChange}
              minLength="2"
              maxLength="5000"
              className="reusableTextarea"
            />
            <div className="flex justify-between">
              <ul className="flex justify-between w-full space-x-2">
                <button
                  type="button"
                  className={`${
                    formData.topic === "Allgemein"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } p-2 rounded-md transition-colors`}
                  onClick={() =>
                    setFormData({ ...formData, topic: "Allgemein" })
                  }
                >
                  Allgemein
                </button>
                <button
                  type="button"
                  className={`${
                    formData.topic === "Frage"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } p-2 rounded-md transition-colors`}
                  onClick={() => setFormData({ ...formData, topic: "Frage" })}
                >
                  Frage
                </button>
                <button
                  type="button"
                  className={`${
                    formData.topic === "Aufruf"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } p-2 rounded-md transition-colors`}
                  onClick={() => setFormData({ ...formData, topic: "Aufruf" })}
                >
                  Aufruf
                </button>
                <button
                  type="button"
                  className={`${
                    formData.topic === "Hinweis"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } p-2 rounded-md transition-colors`}
                  onClick={() => setFormData({ ...formData, topic: "Hinweis" })}
                >
                  Hinweis
                </button>
              </ul>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-800"
              >
                Bild hochladen
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="reusableFormBtn">
                Absenden
              </button>
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default CreateGroupPost;
