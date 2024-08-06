import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { GroupsContext } from "../context/groupsContext.jsx";
import GroupCard from "./GroupCard.jsx";
import Searchbar from "./Searchbar.jsx";
import SearchBtnUnclick from "./SearchBtnUnclick.jsx";
import GroupFilter from "./GroupFilter.jsx";
import { Link } from "react-router-dom";
import { getBaseUrl } from "../../utils/envUtils.js";
import "../reuseable/styles/reusableGlobal.css";
import "../reuseable/styles/reusableFormComponents.css";

const GroupOverview = () => {
  const { userData } = useContext(UserContext);
  const { groupsData, setGroupsData } = useContext(GroupsContext);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropDFilterIsOpen, setDropDFilterIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const baseUrl = getBaseUrl(); // Get the base URL from the utility function

  
  console.log("Userdata Groups in overview:", userData.groups);

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const response = await fetch(`${baseUrl}/getAllGroups`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data overview:", data);
        setGroupsData(data);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupsData();
  }, [setGroupsData]);

  useEffect(() => {
    console.log("Search results:", searchResults);
  }, [searchResults]);

  const toggleSearchInput = () => {
    setSearchInputVisible(!searchInputVisible);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/getSearchGroups/${searchValue}`, {
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSearchResults(responseData);
      console.log("Search fetch results:", responseData);
    } catch (error) {
      console.error("Error searching groups:", error);
    }

    setSearchInputVisible(false);
    setSearchValue("");
  };

  const toggleDropdown = () => {
    setDropDFilterIsOpen(!dropDFilterIsOpen);
  };

  const handleFilterChange = (event) => {
    console.log("Filter Log:", event.target.value);
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    console.log("Updated selectedTag:", selectedTag);
  }, [selectedTag]);

  let filteredGroups = groupsData;
  if (selectedTag) {
    filteredGroups = groupsData.filter((group) => group.tags.includes(selectedTag));
    console.log("Filtered groups:", filteredGroups);
  }

  return (
    <section className="relative min-h-screen overflow-hidden flex justify-center items-center">
      <div className="w-full h-full overflow-auto">
        <div className="reusableContainer mx-auto flex flex-col items-center">
          <div className="min-w-420px">
            <div className="reusableHeaderBar bg-stone-400 mt-2">
              <header className="p-5">
                <h2 className="text-3xl">Gruppen</h2>
              </header>
              <div className="flex justify-between items-center p-2">
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
                      <li className="flex items-center" onClick={toggleDropdown}>
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
                        <GroupFilter
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
                  <Link to="/groupsForm">
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

            {/* RENDERING DER CARDS */}
            {searchResults.length > 0 ? (
              <>
                <span>gefundene Suchergebnisse</span>
                <button
                  className="border border-solid ml-5"
                  onClick={() => setSearchResults([])}
                >
                  Zurück
                </button>
                <ul className="h-auto">
                  {searchResults.map((group, index) => (
                    <GroupCard key={index} group={group} />
                  ))}
                </ul>
              </>
            ) : selectedTag ? (
              <ul className="h-auto">
                {filteredGroups.map((group, index) => (
                  <GroupCard key={index} group={group} />
                ))}
              </ul>
            ) : (
              <>
                <h3 className="reusableH3 text-xl font-semibold mb-4 pb-2 border-b-2 w-full px-4 py-2 mt-5">
                  Deine Gruppen
                </h3>
                <ul className="h-auto">
                  {userData.groups &&
                    [...userData.groups]
                      .reverse()
                      .map((group, index) => (
                        <GroupCard key={index} group={group} />
                      ))}
                </ul>

                <h3 className="reusableH3 text-xl font-semibold mb-4 pb-2 border-b-2 w-full px-4 py-2 mt-5">
                  Andere Gruppen
                </h3>
                <ul className="h-auto">
                  {groupsData &&
                    groupsData
                      .filter(
                        (groupData) =>
                          !userData.groups.some(
                            (userGroup) => userGroup._id === groupData._id
                          )
                      )
                      .map((group) => (
                        <GroupCard key={group._id} group={group} />
                      ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupOverview;
