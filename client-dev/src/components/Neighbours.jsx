import Map from "./Map.jsx";
import NearbyNeighbours from "./NearbyNeighbours.jsx";

const Neighbours = () => {


  
  return (
    <>
      <div className="w-full mt-20">
        <h1>Du und deine Nachbarn: </h1>

        <Map />
        
        <NearbyNeighbours />

      </div>
    </>
  );
};

export default Neighbours;