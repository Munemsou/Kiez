import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Circle, GeoJSON, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GeoCodeConverter from './GeoCodeConverter.jsx';
// import { UserContext } from './context/userContext.jsx';


const Map = () => {


  const userData = JSON.parse(localStorage.getItem('userData'));
  

  const postGeoData = async () => {

    const body = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      zip: userData.address[0].zip,
      latitude: userData.geoCode[0],
      longitude: userData.geoCode[1],
  };  

  const response = await fetch("http://localhost:5500/neighbours", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  // console.log("data in map (posted to db):", data); 
};
postGeoData();


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [radius, setRadius] = useState(250);
  const [zipcode, setZipcode] = useState('');
  const [allZipcodeGeoJson, setAllZipcodeGeoJson] = useState(null);



  // Fetche GeoJSON  für alle PLZ
  useEffect(() => {
    fetch(`/plz5stellig.geojson`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch GeoJSON data. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAllZipcodeGeoJson(data);
      })
      .catch((error) => console.error('Error fetching GeoJSON:', error));
  }, []);


  const handleCoordinatesChange = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };


  const handleRadiusChange = (event) => {
    setRadius(parseInt(event.target.value));
  };


  const memoizedZipcodeGeoJSON = useMemo(() => {

    if (!allZipcodeGeoJson || !zipcode) return null;

    const filteredData = allZipcodeGeoJson.features.filter(feature => feature.properties.plz === zipcode);

    return <GeoJSON key={zipcode} data={{ type: 'FeatureCollection', features: filteredData }} style={() => ({ color: 'blue' })} />;

  }, [allZipcodeGeoJson, zipcode]);


  return (
    <div className= ' flex justify-center items-center' >
      <div className='w-full md:w-1/2 h-3/10'>
        {/* <h1 className='text-center mb-4'>Map with Radius Search</h1> */}

        <GeoCodeConverter onCoordinatesChange={handleCoordinatesChange} onZipcodeChange={setZipcode} />

        {/* Ternary: wenn Geo-Daten true --> render Karte  */}
        {latitude && longitude && (
          <div>
            <div className='mb-4'>
              <label>Select Radius:</label>
              <select value={radius} onChange={handleRadiusChange}>
                <option value={100}>100m</option>
                <option value={250}>250m</option>
                <option value={500}>500m</option>
              </select>
            </div>
            <div className=''>
              {/* //TODO: Soll height der map variabel oder fix sein? */}
              <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '40vh' }}>

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Umkreissuche  */}
                <Marker position={[latitude, longitude]} />
                <Circle center={[latitude, longitude]} radius={radius} color="red" fillColor="#f03" fillOpacity={0.2} />

                {/* Maßstab */}
                <ScaleControl position="bottomright" />

                {memoizedZipcodeGeoJSON}


              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
