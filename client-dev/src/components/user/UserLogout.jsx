import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.jsx';
import { GroupsContext } from '../context/groupsContext.jsx';
import { getBaseUrl } from '../../utils/envUtils.js';

const UserLogout = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const { groupsData } = useContext(GroupsContext);
  const navigate = useNavigate();

  const baseUrl = getBaseUrl();

  const logout = async () => {
    const path = 'logout'; // Adjust this path based on your API endpoint

    try {
      console.log(`Making POST request to: ${baseUrl}/${path}`);

      const response = await fetch(`${baseUrl}/${path}`, {
        method: 'POST',
        credentials: 'include', // Include cookies with request
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      console.log('Logout response:', response);
      setIsLoggedIn(false);
      localStorage.clear();
      console.log('Logout LOG groupsData Context', groupsData);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Use `useEffect` to trigger logout only on component mount
  useEffect(() => {
    logout();
  }, []);

  return null; // Return null or a loading indicator
};

export default UserLogout;
