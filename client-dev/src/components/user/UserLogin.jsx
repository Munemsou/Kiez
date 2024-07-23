import { useNavigate } from "react-router-dom";
import { postDate } from "../reuseable/fetchData.jsx";
import "../reuseable/styles/reusableFormComponents.css";
import "../reuseable/styles/reusableGlobal.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";

const UserLogin = () => {
  const { setIsLoggedIn, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();
    const el = event.target.elements;
    const body = {
      email: el.email.value,
      password: el.password.value,
    };
    console.log(body);
    try {
      const data = await postDate("login", body); // postDate ist ausgelagerter Fetch
      console.log({ data });
      setUserData(data.user);

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      navigate("/login");
    }
  };
  return (
    <section className="flex  justify-center mt-64  items-center  w-full">
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
                />
              </div>
              <button type="submit" className="reusableFormBtn ">
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
