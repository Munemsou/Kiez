import { useContext } from 'react';
import { UserContext } from '../context/userContext.jsx';
// import MyDropdown from "./DropDown.jsx";
import Options from "../OptionsMenu.jsx"
const Home = () => {
  const {isloggedIn} = useContext(UserContext);

  return (
  <>
  <p>Hallo! Du bist {isloggedIn ? "" : "nicht"} eingeloggt.</p>
  {/* <Options>Test</Options> */}
  </>
  )
};
export default Home;
