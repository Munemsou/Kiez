import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData } from "../reuseable/fetchData.jsx";
import "../reuseable/styles/reusableFormComponents.css";
import "../reuseable/styles/reusableGlobal.css";

const UserRegister = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      address: [{ zip, street, number }],
    };

    try {
      const data = await postData("register", body);
      setSuccess("Registration successful!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setZip("");
      setStreet("");
      setNumber("");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
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
          <form className="reusableForm" onSubmit={submitHandler}>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white">
                Register
              </h2>
              {error && (
                <div className="mb-4 text-center text-red-500">{error}</div>
              )}
              {success && (
                <div className="mb-4 text-center text-green-500">{success}</div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
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
              <div className="mb-4">
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
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  ZIP:
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Street:
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  House Number:
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  required
                />
              </div>
              <button type="submit" className="reusableFormBtn">
                Register
              </button>
              <div className="mt-4 text-center">
                <a
                  href="/login"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Already have an account? Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;