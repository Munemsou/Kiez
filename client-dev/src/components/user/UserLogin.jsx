import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import { postDate } from "../reuseable/fetchData.jsx"; // Importing postDate function for making API requests
import "../reuseable/styles/reusableFormComponents.css"; // Importing styles
import "../reuseable/styles/reusableGlobal.css"; // Importing global styles
import { useContext, useState } from "react"; // Importing useContext and useState hooks from React
import { UserContext } from "../context/userContext.jsx"; // Importing UserContext for user state management

const UserLogin = () => {
  // Extracting setIsLoggedIn and setUserData functions from UserContext
  const { setIsLoggedIn, setUserData } = useContext(UserContext);
  const navigate = useNavigate(); // Initializing navigate function for programmatic navigation

  // Defining state variables for email, password, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Async function to handle form submission
  const login = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const body = { email, password }; // Constructing the body object from state

    try {
      const data = await postDate("login", body); // Making API request to login endpoint
      console.log({ data }); // Logging the response for debugging

      setUserData(data.user); // Setting user data in context
      setIsLoggedIn(true); // Setting the user as logged in
      navigate("/dashboard"); // Navigating to the dashboard on successful login
    } catch (error) {
      console.error('Login failed:', error); // Logging the error for debugging
      setError("Invalid email or password"); // Setting the error message
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
                  required // Ensuring email field is required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Passwort:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required // Ensuring password field is required
                />
              </div>
              <button type="submit" className="reusableFormBtn">
                Einloggen
              </button>
              <div className="mt-4 text-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Passwort vergessen?
                </a>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="/register"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Noch kein Konto? Registrieren
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
