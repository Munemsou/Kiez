import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import CurrencyInput from "react-currency-input-field";

import { useNavigate } from "react-router-dom";
// import { postData } from "../reuseable/fetchData.jsx";
import { handleImageUpload } from "../reuseable/imgToString.jsx";

const MarketForm = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorTags, setErrorTags] = useState("");
  const [errorOfferType, setErrorOfferType] = useState("");
  const [divSelector, setDivSelector] = useState("");
  const [price, setPrice] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    tags: "",
    zip: userData.address[0].zip,
    offerType: "", //~ Verkaufen, verschenken  etc
  });

  useEffect(() => {
    setFormData((prevObj) => ({ ...prevObj, offerType: priceInput }));
  }, [priceInput]);

  //! Cloudinary
  useEffect(() => {
    formData.image = uploadImg;
    console.log(uploadImg);
  }, [uploadImg]);

  // alle Input Felder
  const handleChange = (e) => {
    setErrorTitle("");
    setErrorDescription("");
    setErrorTags("");
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Preis Input
  const handlePriceChange = (value) => {
    setErrorTitle("");
    setErrorDescription("");
    setErrorTags("");
    /* 
    wenn man bei Preis nix angibt und Senden klickt, wird ein error unter Preis angezeigt. Wenn man jetzt einen Buchstaben klickt, verschwindet die Error Message, obwohl der PreisInput keine Buchstaben akzeptiert. Um dieses Problem zu lösen, wird erst geprüft, ob 'value' eine Zahl ist. Falls nicht, wird der Nutzer erneut aufgefordert eine Zahl einzugeben! 
     */
    if (isNaN(value)) {
      setErrorPrice("Bitte gib eine Zahl ein");
    } else {
      setErrorPrice("");
    }
    setPrice(value);
    setFormData((prevData) => ({
      ...prevData,
      price: value,
    }));
  };

  // const handleImageUpload = () => {
  //   // Hier  Bild-Upload-Logik hinzufügen
  //   console.log("Bild hochgeladen");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // checke, ob Formular korrekt ausgefüllt wurde
      //! bug -> wenn mehrere Felder fehlen, wird nur oberstes angezeigt
      if (!formData.title) {
        setErrorTitle("Bitte gib einen Artikel ein");
        return;
      }
      if (!formData.description) {
        setErrorDescription("Bitte gib eine Beschreibung ein");
        return;
      }

      if (!priceInput) {
        setErrorOfferType("Bitte wähle einen Angebotstyp");
        return;
      }

      if (priceInput === "Verkaufen" || priceInput === "Vermieten") {
        if (!formData.price) {
          setErrorPrice("Bitte gib einen Preis an");
          return;
        }
      }

      if (!formData.tags) {
        setErrorTags("Bitte gib eine Kategorie an");
        return;
      }

      const response = await fetch("http://localhost:5500/createMarketItem", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("dATA in MarketForm handleSubmit:", data);

      // User.marketItems und LocalStorage aktualisieren (frontend)
      setUserData({
        ...userData,
        marketItems: [{ ...userData.marketItems }, formData],
      });

      navigate("/market");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDivSelector = (input) => {
    setDivSelector(input);
    setErrorOfferType("");
  };

  return (
    <section className="flex  justify-center items-center min-h-screen w-full">
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="relative">
        <div className="reusableSquare absolute" style={{ "--i": 0 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 1 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 2 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 3 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 4 }}></div>
        <div className="reusableContainer reusableBorder mt-12 shadow-md">
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                🛍️ Erstelle neues Angebot:
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-800"
                >
                  Artikel
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errorTitle && <p className="text-red-500">{errorTitle}</p>}
              </div>
              {/* ____________________________________________________ */}

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-800"
                >
                  Beschreibung
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 p-2 text-gray-800 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
                {errorDescription && (
                  <p className="text-red-500">{errorDescription}</p>
                )}
              </div>
              {/* ____________________________________________________ */}

              <>
                <div
                  onClick={() => {
                    handleDivSelector("Verkaufen");
                    setPriceInput("Verkaufen");
                  }}
                  className={`mt-1 p-2 border border-black text-gray-800 inline-block w-1/2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    divSelector === "Verkaufen"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  Verkaufen
                </div>

                <div
                  onClick={() => {
                    handleDivSelector("Verschenken");
                    setPriceInput("Verschenken");
                  }}
                  className={`mt-1 p-2 border border-black text-gray-800 inline-block w-1/2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    divSelector === "Verschenken"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  Verschenken
                </div>

                <div
                  onClick={() => {
                    handleDivSelector("Tauschen");
                    setPriceInput("Tauschen");
                  }}
                  className={`mt-1 p-2 border border-black text-gray-800 inline-block w-1/2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    divSelector === "Tauschen"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  Tauschen
                </div>

                <div
                  onClick={() => {
                    handleDivSelector("Vermieten");
                    setPriceInput("Vermieten");
                  }}
                  className={`mt-1 p-2 border border-black text-gray-800 inline-block w-1/2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    divSelector === "Vermieten"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  Vermieten
                </div>

                <div
                  onClick={() => {
                    handleDivSelector("Verleihen");
                    setPriceInput("Verleihen");
                  }}
                  className={`mt-1 mb-4 p-2 border border-black text-gray-800 inline-block w-1/2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    divSelector === "Verleihen"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  Verleihen (gratis)
                </div>

                <div
                  onClick={() => {
                    handleDivSelector("Sonstiges");
                    setPriceInput("Sonstiges");
                  }}
                  className={`mt-1 p-2 border border-black text-gray-800 inline-block w-1/2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    divSelector === "Sonstiges"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  Sonstiges
                </div>
                {errorOfferType && (
                  <p className="text-red-500">{errorOfferType}</p>
                )}
              </>

              {/* //^ Conditional Rendering -> je nach Angebotstyp wird Preis-Input aktiviert oder deaktiviert (nicht klickbar)  */}

              {priceInput === "Verkaufen" ? (
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Preis:
                  </label>
                  <CurrencyInput
                    id="price"
                    name="price"
                    value={price}
                    onValueChange={(value) => handlePriceChange(value)}
                    allowNegativeValue={false}
                    placeholder=" €"
                    suffix="€"
                    allowDecimals={false}
                    groupSeparator=" "
                    defaultValue={0}
                    // disabled
                    className="mt-1  p-2 text-gray-800 block w-1/4 border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errorPrice && <p className="text-red-500">{errorPrice}</p>}
                </div>
              ) : (
                ""
              )}

              {priceInput === "Verschenken" ? (
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Preis:
                  </label>
                  <CurrencyInput
                    id="price"
                    name="price"
                    value={price}
                    onValueChange={(value) => handlePriceChange(value)}
                    allowNegativeValue={false}
                    placeholder=" €"
                    suffix=" €"
                    allowDecimals={false}
                    defaultValue={0}
                    disabled
                    className="mt-1  p-2 text-gray-800 block w-1/4 border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ) : (
                ""
              )}

              {priceInput === "Tauschen" ? (
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Preis:
                  </label>
                  <CurrencyInput
                    id="price"
                    name="price"
                    value={price}
                    onValueChange={(value) => handlePriceChange(value)}
                    allowNegativeValue={false}
                    placeholder=" €"
                    suffix="€"
                    allowDecimals={false}
                    defaultValue={0}
                    disabled
                    className="mt-1  p-2 text-gray-800 block w-1/4 border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ) : (
                ""
              )}

              {priceInput === "Vermieten" ? (
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Preis:
                  </label>
                  <CurrencyInput
                    id="price"
                    name="price"
                    value={price}
                    onValueChange={(value) => handlePriceChange(value)}
                    allowNegativeValue={false}
                    placeholder=" €"
                    suffix="€"
                    allowDecimals={false}
                    groupSeparator=" "
                    defaultValue={0}
                    // disabled
                    className="mt-1  p-2 text-gray-800 block w-1/4 border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errorPrice && <p className="text-red-500">{errorPrice}</p>}
                </div>
              ) : (
                ""
              )}

              {priceInput === "Verleihen" ? (
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Preis:
                  </label>
                  <CurrencyInput
                    id="price"
                    name="price"
                    value={price}
                    onValueChange={(value) => handlePriceChange(value)}
                    allowNegativeValue={false}
                    placeholder=" €"
                    suffix=" €"
                    allowDecimals={false}
                    defaultValue={0}
                    disabled
                    className="mt-1  p-2 text-gray-800 block w-1/4 border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ) : (
                ""
              )}

              {priceInput === "Sonstiges" ? (
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Preis:
                  </label>
                  <CurrencyInput
                    id="price"
                    name="price"
                    value={price}
                    onValueChange={(value) => handlePriceChange(value)}
                    allowNegativeValue={false}
                    placeholder=" €"
                    suffix=" €"
                    allowDecimals={false}
                    defaultValue={0}
                    disabled
                    className="mt-1  p-2 text-gray-800 block w-1/4 border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ) : (
                ""
              )}

              {/* {priceInput === 'Verkaufen' ? <p>Verkaufen</p> : ''}
            {priceInput === 'Verschenken' ? <p>Verschenken</p> : ''}
            {priceInput === 'Tauschen' ? <p>Tauschen</p> : ''}
            {priceInput === 'Vermieten' ? <p>Vermieten</p> : ''}
            {priceInput === 'Verleihen' ? <p>Verleihen</p> : ''} */}

              {/* ____________________________________________________ */}

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
                  onChange={(e) => handleImageUpload(e, setUploadImg)}
                  className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* ____________________________________________________ */}

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
                  value={formData.tags}
                  onChange={handleChange}
                  className="mt-1 block text-gray-800 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>
                    Wähle eine Kategorie aus...
                  </option>
                  <option value="Moebel & Deko">Möbel & Deko</option>
                  <option value="Fahrrad & Auto">Fahhrad & Auto</option>
                  <option value="Küche & Haushalt">Küche & Haushalt</option>
                  <option value="Baby & Kind">Baby & Kind</option>
                  <option value="Umzug & Transport">Umzug & Transport</option>
                  <option value="Kleidung & Accessoires">
                    Kleidung & Accessoires
                  </option>
                  <option value="Bücher, Filme & Musik">
                    Bücher, Filme & Musik
                  </option>
                  <option value="Garten & Heimwerken">
                    Garten & Heimwerken
                  </option>
                  <option value="Computer & Elektronik">
                    Computer & Elektronik
                  </option>
                  <option value="Sport, Spiel & Freizeit">
                    Sport, Spiel & Freizeit
                  </option>
                  <option value="Lebensmittel">Lebensmittel</option>
                  <option value="Haustierzubehör">Haustierzubehör</option>
                  <option value="Gesundheit & Körperpflege">
                    Gesundheit & Körperpflege
                  </option>
                  <option value="Bürobedarf">Bürobedarf</option>
                  <option value="Immobilien">Immobilien</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                {errorTags && <p className="text-red-500">{errorTags}</p>}
              </div>
              {/* ____________________________________________________ */}

              <button type="submit" className="reusableFormBtn">
                Artikel erstellen
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MarketForm;
