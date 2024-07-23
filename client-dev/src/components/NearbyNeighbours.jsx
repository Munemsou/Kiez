import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext.jsx";




const NearbyNeighbours = () => {
  const { userData } = useContext(UserContext);

  // console.log(userData._id);

  // console.log("userData --> ", userData.address[0]);

  const [zipCodeNeighbours, setZipCodeNeighbours] = useState(null);

  useEffect(() => {
    const getZipcodeNeighbours = async () => {
      try {
        const response = await fetch("http://localhost:5500/neighbours", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ zip: userData.address[0].zip }),
        });
        const data = await response.json();

        // console.log("____________data.zipNeighbours_____________");
        // console.log(data.zipNeighbours);

        setZipCodeNeighbours(data.zipNeighbours);

        // console.log("____________zipCodeNeighbours______________");
        // console.log(zipCodeNeighbours[0]._id);
      } catch (err) {
        console.log(err);
      }
    };
    getZipcodeNeighbours();
  }, []);

  // useEffect(() => {}, [zipCodeNeighbours]);



  const divStyle = {
    border: '1px solid black',
    backgroundColor: 'lightblue',
    padding: '1rem',
    marginTop: '1rem'
  };
  const liStyle = {
    padding: '1rem',
    margin: '0.4rem 0 0.4rem 0',
    border: '3px solid black',
    borderRadius: '8px'
  };

  const headerStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    padding: '1rem 0'
  };

  return (
    <>
      {/* {if(userData._id === zipCodeNeighbours.)} */}
      <div style={divStyle}>
        <p style={headerStyle} >Nachbarn in deinem PLZ-Bereich: </p>
        <ul>
          {/* Prüfe ob PLZ-Nachbarn gefunden wurden, wenn ja --> map()  */}
          {zipCodeNeighbours && 
            zipCodeNeighbours.map((neighbour, i) => {
              // sich selbst nicht anzeigen -> return null
              if(userData._id === zipCodeNeighbours[i]._id) {
                return null;
              } else {
                // alle anderen PLZ-Nachbarn renden
                return (
                  <li style={liStyle} key={i}>
                    {`${neighbour.firstName} ${neighbour.lastName} (${neighbour.address[0].zip})`}                    
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </>
  );
};

export default NearbyNeighbours;




