const GroupFilter = ({ selectedTag, onChange }) => {
  return (
    <div>
      <select
        id="tags"
        name="tags"
        value={selectedTag}
        onChange={onChange}
        className="mt-1 block w-1/2 text-gray-800 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>
          Wähle eine Kategorie aus...
        </option>
        <option value="Kennlern/Stammtisch">Kennlern/Stammtisch</option>
        <option value="Bildung/Erfahrung">Bildung/Erfahrung</option>
        <option value="Kunst, Kultur & Musik">Kunst, Kultur & Musik</option>
        <option value="Märkte & Flohmärkte">Märkte & Flohmärkte</option>
        <option value="Computer, Internet & Technik">
          Computer, Internet & Technik
        </option>
        <option value="Familien & Kinder">Familien & Kinder</option>
        <option value="Essen & Trinken">Essen & Trinken</option>
        <option value="Feste & Feiern">Feste & Feiern</option>
        <option value="Lokales Engagement">Lokales Engagement</option>
        <option value="Gestalten & Heimwerken">Gestalten & Heimwerken</option>
        <option value="Gesundheit / Wellness">Gesundheit / Wellness</option>
        <option value="Sport & Bewegung">Sport & Bewegung</option>
        <option value="Umwelt & Nachhaltigkeit">Umwelt & Nachhaltigkeit</option>
        <option value="Teilen, Tauschen, Reparieren">
          Teilen, Tauschen, Reparieren
        </option>
        <option value="Viertel verschönern">Viertel verschönern</option>
        <option value="Ausflüge">Ausflüge</option>
        <option value="Sonstiges">Sonstiges</option>
      </select>
    </div>
  );
};

export default GroupFilter;
