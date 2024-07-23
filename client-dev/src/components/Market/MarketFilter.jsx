const MarketFilter = ({ selectedTag, onChange }) => {
  return (
    <div>
      <select
        id="tags"
        name="tags"
        value={selectedTag}
        onChange={onChange}
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
        <option value="Kleidung & Accessoires">Kleidung & Accessoires</option>
        <option value="Bücher, Filme & Musik">Bücher, Filme & Musik</option>
        <option value="Garten & Heimwerken">Garten & Heimwerken</option>
        <option value="Computer & Elektronik">Computer & Elektronik</option>
        <option value="Sport, Spiel & Freizeit">Sport, Spiel & Freizeit</option>
        <option value="Lebensmittel">Lebensmittel</option>
        <option value="Haustierzubehör">Haustierzubehör</option>
        <option value="Gesundheit & Körperpflege">
          Gesundheit & Körperpflege
        </option>
        <option value="Bürobedarf">Bürobedarf</option>
        <option value="Immobilien">Immobilien</option>
        <option value="Sonstiges">Sonstiges</option>
      </select>
    </div>
  );
};

export default MarketFilter;