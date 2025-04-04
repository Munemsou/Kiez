import { createContext, useEffect, useState } from "react";
import { getBaseUrl } from "../../utils/envUtils.js"; // Import getBaseUrl function

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groupsData, setGroupsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupsData = async () => {
      setIsLoading(true);
      const baseUrl = getBaseUrl(); // Get the base URL from the utility function

      try {
        const response = await fetch(`${baseUrl}/groups`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setGroupsData(data);
        localStorage.setItem("groupsData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching group data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data if not already loaded
    if (groupsData.length === 0) {
      fetchGroupsData();
    } else {
      setIsLoading(false); // Assume data is loaded if `groupsData` is not empty
    }
  }, [groupsData]);

  useEffect(() => {
    if (groupsData.length > 0) {
      localStorage.setItem("groupsData", JSON.stringify(groupsData));
    }
  }, [groupsData]);

  return (
    <GroupsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        groupsData,
        setGroupsData,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
