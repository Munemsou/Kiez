import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.jsx';
import { buttonStyle } from '../reuseable/styles/reuseableComponents.jsx';
import { GroupsContext } from '../context/groupsContext.jsx';

const UserLogout = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const { groupsData } = useContext(GroupsContext);
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch("http://localhost:5500/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log(response);
    setIsLoggedIn(false);
    localStorage.clear();
    console.log("Logout LOG groupsData Context", groupsData);
    navigate("/login");
  };
  logout()
  /* return <button onClick={logout} className={buttonStyle}>Log Out</button>; */
};

export default UserLogout;
