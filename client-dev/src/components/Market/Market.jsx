import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { MarketContext } from "../context/marketContext.jsx";
import Searchbar from "./Searchbar.jsx";
import SearchBtnUnclick from "./SearchBtnUnclick.jsx";
import MarketFilter from "./MarketFilter.jsx";
import MarketCard from "./MarketCard.jsx";
import "../reuseable/styles/reusableGlobal.css";
import "../reuseable/styles/reusableFormComponents.css";
import { Link } from "react-router-dom";

const Market = () => {
  // eslint-disable-next-line no-unused-vars
  const { userData } = useContext(UserContext); //todo -> Profil des Anbieters Bild, Link
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropDFilterIsOpen, setDropDFilterIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const { marketData, setMarketData } = useContext(MarketContext);

  //! BUG WARUM wird USEFFECT nicht ausgelöst
  useEffect(() => {
    console.log("FЯ!ΞdℇM4ภภ");
    const getMarketItems = async () => {
      try {
        console.log("TEST TEST TEST TES TESTTT");
        //todo Nach dem fetchen aller Market items, filtern nach PLZ oder Stadt (zB. alle PLZs von Berlin) fehlen
        //todo Alternativ -> Umkreissuche -> Artikel in 100m/250m/500m etc
        const response = await fetch(
          `http://localhost:5500/getAllMarketItems`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log("DATA DATA DATA IN MARKET ->>>", data);
        setMarketData(data);
      } catch (err) {
        console.log("Error fetching market items:", err);
      }
    };
    getMarketItems();
  }, []);

  useEffect(() => {
    console.log("marketItems in Market.jsx:", marketData);
    console.log("searchResults:", searchResults);
  }, [marketData, searchResults]);

  /******************************************************
   *    SuchFunktion
   ******************************************************/

  // Funktion zum Umschalten der Sichtbarkeit des Suchfelds
  const toggleSearchInput = () => {
    setSearchInputVisible(!searchInputVisible);
    setSearchValue("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // suche
      const response = await fetch(
        `http://localhost:5500/getMarketItemByName/${searchValue}`,
        {
          credentials: "include",
        }
      );

      //! Error Message durch Userverständliche MSG ersetzten
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // in JSON umgewandeln
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching groups:", error);
    }
    // Sichtbarkeit des Suchfelds zurück setzen
    setSearchInputVisible(false);
    // setSearchValue("");
  };

  /******************************************************
   *    FilterFunktion
   ******************************************************/
  const toggleDropdown = () => {
    setDropDFilterIsOpen(!dropDFilterIsOpen);
  };

  // Handler-Funktion für die Auswahl im Dropdown-Menü
  const handleFilterChange = (event) => {
    console.log("Filter Log", event.target.value);
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    console.log("Aktualisierter selectedTag: ", selectedTag);
  }, [selectedTag]);

  // // Filtere gruppenliste nach Tag
  let filteredMarketItems = marketData;
  if (selectedTag) {
    filteredMarketItems = marketData.filter(
      (item) => item.tags === selectedTag
    );
    console.log(filteredMarketItems);
  }

  // if(marketItems.length !== 0) {
  return (
    <section className="relative min-h-screen overflow-hidden flex justify-center items-center">
      {/* Fest positionierter Hintergrund */}
      <div className="absolute inset-0">
        {/*   <div className="fixed reusableGlobalBackground "></div>
        <div className="fixed reusableGlobalBackground "></div>
        <div className=" fixed reusableGlobalBackground "></div> */}
      </div>
      {/* Scrollbarer Inhalts-Container */}
      <div className="w-full h-full overflow-auto ">
        <div className="reusableContainer mx-auto flex flex-col items-center">
          <div className="min-w-420px">
            <div className="reusableHeaderBar bg-stone-400 mt-2">
              <header className="p-5">
                <h2 className="text-3xl">Marktplatz</h2>
              </header>
              <div className=" flex justify-between items-center p-2">
                <ul className="border-black flex justify-between w-80">
                  {searchInputVisible ? (
                    <Searchbar
                      toggleSearchInput={toggleSearchInput}
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      handleSearch={handleSearch}
                    />
                  ) : (
                    <SearchBtnUnclick toggleSearchInput={toggleSearchInput} />
                  )}
                  {!searchInputVisible && (
                    <>
                      <li
                        className="flex items-center"
                        onClick={toggleDropdown}
                      >
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
                            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                          />
                        </svg>
                        Filter
                      </li>
                      {dropDFilterIsOpen && (
                        <MarketFilter
                          selectedTag={selectedTag}
                          onChange={handleFilterChange}
                        />
                      )}
                    </>
                  )}

                  {!dropDFilterIsOpen && (
                    <li className="flex items-center">
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
                          d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                        />
                      </svg>
                      Sortieren
                    </li>
                  )}
                </ul>

                <aside className="pr-3">
                  <Link to="/marketForm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </aside>
              </div>
            </div>
            {/* //*____________________________________ */}

            <div>
              <h3 className="reusableH3 text-xl font-semibold mb-4 pb-2 border-b-2 w-full px-4 py-2 mt-5">
                WILLKOMMEN AUF DEM MARKTPLATZ
              </h3>

              {/* //! BUG -> Ergebnisse erst anzeigen, wenn btn geklickt wird */}
              {/* 
            Prüfe, ob marketData kein leeres Array ist 
            prüfe, ob etwas im Input eingegeben wurde (searchValue)
              wenn ja, filter durch Titel und mappe/render alle passenden
              wenn nein ->
            prüfe on selectedTag ausgewählt wurde (Kategorie)
              wenn ja, filter durch Tags und mappe/render alle passenden
              wenn nein, mappe alle Artikel und render alle Artikel
          */}
              {marketData &&
                (searchValue
                  ? marketData
                      .filter((marketItem) =>
                        marketItem.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      )
                      .map((item, i) => <MarketCard key={i} item={item} />)
                  : selectedTag
                  ? marketData
                      .filter((marketItem) =>
                        marketItem.tags.includes(selectedTag)
                      )
                      .map((item, i) => <MarketCard key={i} item={item} />)
                  : marketData.map((item, i) => (
                      <MarketCard key={i} item={item} />
                    )))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Market;

/* 
wenn searchValue kein empty String -> map durch items -> includes?

{searchValue && 
  marketData.map(item, i) => {
    item.title.includes(searchValue) ? <MarketCard key={i} /> : <Oops />
  }
}
*/
