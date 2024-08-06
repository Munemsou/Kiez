import { useNavigate } from "react-router-dom";
import { postData } from "../reuseable/fetchData.jsx";
import "../reuseable/styles/reusableFormComponents.css";
import "../reuseable/styles/reusableGlobal.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { getBaseUrl } from '../../utils/envUtils.js'; // Import the baseUrl function

const UserLogin = () => {
  const { setIsLoggedIn, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const baseUrl = getBaseUrl(); // Get the base URL

  const login = async (event) => {
    event.preventDefault();

    const body = { email, password };

    try {
      // Pass baseUrl to the postData function
      const data = await postData(`https://kiez-server.onrender.com/login`, body);
      console.log('Login successful:', data);

      setUserData(data.user);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed:', error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <section className="flex justify-center mt-64 items-center w-full">
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="relative">
        <div className="reusableSquare absolute" style={{ "--i": 0 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 1 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 2 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 3 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 4 }}></div>
        <div className="reusableContainer reusableBorder">
          <form className="reusableForm" onSubmit={login}>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white">
                Login
              </h2>
              {error && (
                <div className="mb-4 text-center text-red-500">{error}</div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  E-Mail:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <button type="submit" className="reusableFormBtn">
                Login
              </button>
              <div className="mt-4 text-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="/register"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Don't have an account? Register
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
