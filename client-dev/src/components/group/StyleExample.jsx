import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
// import "./styleExample.css";

const StyleExample = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    tags: "",
    privateGroup: false,
  });

  const handleChange = (e) => {
    setErrorMessage("");
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleTogglePrivate = () => {
    setFormData((prevData) => ({
      ...prevData,
      privateGroup: !prevData.privateGroup,
    }));
  };

  //! Hier fehlt noch die Logik für das Bild-Upload
  const handleImageUpload = () => {
    // Hier  Bild-Upload-Logik hinzufügen
    console.log("Bild hochgeladen");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/createGroup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      // User.groups und LocalStorage aktualisieren (frontend)
      setUserData({ ...userData, groups: [...userData.groups, formData] });

      // Überprüfen, ob die Gruppe(Title) bereits existiert
      if (response.status === 409) {
        const errorMessage = await response.json();
        setErrorMessage(errorMessage.message);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      setErrorMessage("Gruppenname bereits vergeben.");
    }
  };

  return (
    <section className="style-test">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="box">
        <div className="square" style={{ "--i": 0 }}></div>
        <div className="square" style={{ "--i": 1 }}></div>
        <div className="square" style={{ "--i": 2 }}></div>
        <div className="square" style={{ "--i": 3 }}></div>
        <div className="square" style={{ "--i": 4 }}></div>

        <div className="container">
          <div className="form">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Erstelle eine neue Gruppe
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-800"
                >
                  Name der Gruppe
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
              <div className="inputBox  mb-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-800"
                >
                  Gruppenbeschreibung
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 p-2 text-gray-800 block w-full focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div className=" mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="privateGroup"
                  name="privateGroup"
                  checked={formData.privateGroup}
                  onChange={handleTogglePrivate}
                  className="mr-2"
                />
                <label
                  htmlFor="privateGroup"
                  className="text-sm font-medium text-gray-800"
                >
                  Private Gruppe
                </label>
              </div>
              <div className="inputBox  mb-4">
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
                  onChange={handleImageUpload}
                  className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-800"
                >
                  Kategorie
                </label>
                <select
                  id="tags"
                  name="tags"
                  value={formData.tags.length > 0 ? formData.tags[0] : ""}
                  onChange={handleChange}
                  className="mt-1 block text-gray-800 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>
                    Wähle eine Kategorie aus...
                  </option>
                  <option value="Kennlern/Stammtisch">
                    Kennlern/Stammtisch
                  </option>
                  <option value="Bildung/Erfahrung">Bildung/Erfahrung</option>
                  <option value="Kunst, Kultur & Musik">
                    Kunst, Kultur & Musik
                  </option>
                  <option value="Märkte & Flohmärkte">
                    Märkte & Flohmärkte
                  </option>
                  <option value="Computer, Internet & Technik">
                    Computer, Internet & Technik
                  </option>
                  <option value="Familien & Kinder">Familien & Kinder</option>
                  <option value="Essen & Trinken">Essen & Trinken</option>
                  <option value="Feste & Feiern">Feste & Feiern</option>
                  <option value="Lokales Engagement">Lokales Engagement</option>
                  <option value="Gestalten & Heimwerken">
                    Gestalten & Heimwerken
                  </option>
                  <option value="Gesundheit / Wellness">
                    Gesundheit / Wellness
                  </option>
                  <option value="Sport & Bewegung">Sport & Bewegung</option>
                  <option value="Umwelt & Nachhaltigkeit">
                    Umwelt & Nachhaltigkeit
                  </option>
                  <option value="Teilen, Tauschen, Reparieren">
                    Teilen, Tauschen, Reparieren
                  </option>
                  <option value="Viertel verschönern">
                    Viertel verschönern
                  </option>
                  <option value="Ausflüge">Ausflüge</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>
              <div className="inputBox">
                <button type="submit" className="button">
                  Neue Gruppe erstellen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleExample;
