import { createContext, useEffect, useState } from "react";

export const GroupsContext = createContext();

/* WAS HIER PASSIERT:
 1) Beim Initialisieren der Anwendung wird versucht, Gruppendaten von der API zu laden.
 2) `isLoading` wird zu Beginn auf `true` gesetzt, um den Ladevorgang anzuzeigen. Sobald die Daten geladen oder ein Fehler aufgetreten ist, wird `isLoading` auf `false` gesetzt.
 3) Die Gruppendaten werden im Zustand `groupsData` gespeichert. Initialwert ist `null`, was bedeutet, dass noch keine Daten geladen wurden.
 4) Im Fehlerfall werden Fehlermeldungen in der Konsole angezeigt, und `groupsData` bleibt `null`.
 5) Der Zustand `isLoading` ermöglicht es Komponenten, auf den Ladezustand zu reagieren und z.B. eine Ladeanzeige zu rendern.
 6) `GroupsContext.Provider` macht `groupsData` und `isLoading` im gesamten Komponentenbaum verfügbar, wo dieser Kontext verwendet wird.

ALLGEMEIN:
- `groupsData` enthält die geladenen Gruppendaten und ist für alle Komponenten, die diesen Kontext nutzen, verfügbar.
- Der Ladezustand `isLoading` hilft dabei, eine Benutzeroberfläche (UI) zu gestalten, die auf das Laden der Daten reagiert, indem z.B. Ladeanimationen angezeigt werden, während die Daten noch abgerufen werden.
- `children` repräsentiert die Kindkomponenten dieses Providers, also alle Komponenten, die innerhalb von `GroupsContext.Provider` gerendert werden. Diese Kindkomponenten haben Zugriff auf den Kontext.
*/

export const GroupsProvider = ({ children }) => {
  // Beim Laden aus dem localStorage die Daten parsen
  const savedGroups = JSON.parse(localStorage.getItem("groupsData"));

  const [groupsData, setGroupsData] = useState(savedGroups || null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("groupData in userContext:", groupsData);

  useEffect(() => {
    if (groupsData !== null) {
      localStorage.setItem("groupsData", JSON.stringify(groupsData));
    }
  }, [groupsData]);

  console.log({ groupsData });

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
