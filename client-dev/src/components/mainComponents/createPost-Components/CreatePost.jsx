import { useState } from "react";
import MitteilungForm from "./MitteilungForm.jsx";
import MarketForm from "../../Market/MarketForm.jsx";

const CreatePost = ({ closeModal }) => {
  // const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);

  return (
    <div className="border max-w-lg mx-auto my-8">
      <section className="border p-4">
        <header className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">
            Erstelle einen neuen Beitrag:
          </h2>
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </header>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <ul className="col-span-3 grid grid-cols-3 gap-4">
            <li
              className="border p-2 cursor-pointer"
              onClick={() => setFormType("Mitteilung")}
            >
              Mitteilung
            </li>
            <li
              className="border p-2 cursor-pointer"
              onClick={() => setFormType("Angebot")}
            >
              Angebot
            </li>
            <li
              className="border p-2 cursor-pointer"
              onClick={() => setFormType("Empfehlung")}
            >
              Empfehlung
            </li>
            <li
              className="border p-2 cursor-pointer"
              onClick={() => setFormType("Gesuch")}
            >
              Gesuch
            </li>
            <li
              className="border p-2 cursor-pointer"
              onClick={() => setFormType("Veranstaltung")}
            >
              Veranstaltung
            </li>
          </ul>
        </div>
        {/* Bedingtes Rendering der MitteilungForm Komponente */}
        {formType && (
          <>
            {formType === "Mitteilung" && (
              <MitteilungForm closeModal={() => setFormType(null)} />
            )}
            {formType === "Angebot" && (
              <MarketForm closeModal={() => setFormType(null)} />
            )}
            {/* Füge hier ähnliche Bedingungen für weitere Formulare hinzu */}
          </>
        )}
      </section>
    </div>
  );
};

export default CreatePost;
