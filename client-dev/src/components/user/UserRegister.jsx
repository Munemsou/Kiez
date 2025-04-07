import {
  buttonStyle,
  inputStyle,
  labelStyle,
} from "../reuseable/styles/reuseableComponents.jsx";
import { getBaseUrl } from '../../utils/envUtils.js';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

const UserRegister = () => {
  const baseUrl = getBaseUrl();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const el = event.target.elements;

    const body = {
      firstName: el.firstName.value,
      lastName: el.lastName.value,
      email: el.email.value,
      password: el.password.value,
      confirmPassword: el.confirmPassword.value,
      address: [
        {
          zip: el.zip.value,
          street: el.street.value,
          number: el.number.value,
        },
      ],
    };

    if (body.password !== body.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const geoCodeData = await getGeoCodeData(body.address);

      if (!geoCodeData) {
        setError("Failed to retrieve geocode data.");
        setLoading(false);
        return;
      }

      const bodyWithGeo = {
        ...body,
        geoCode: [geoCodeData[0], geoCodeData[1]],
      };

      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyWithGeo),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      setSuccess("Registration successful!");
      navigate("/login");
      event.target.reset();
    } catch (error) {
      setError(`Registration error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getGeoCodeData = async (address) => {
    try {
      const queryString = `${address[0].number}+${address[0].street}+${address[0].zip}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${queryString}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        return [latitude, longitude];
      } else {
        console.error("No geocode data found.");
        return null;
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
      return null;
    }
  };

  return (
    <form
      className="h-fit flex flex-col justify-center gap-3 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
      onSubmit={submitHandler}
    >
      <div className="p-2 bg-slate-500/15 shadow-lg rounded w-full gap-2">
        <div>
          <label htmlFor="firstName" className={labelStyle}>
            Vorname:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={inputStyle}
            required
          />
        </div>
        <div className="pt-3">
          <label htmlFor="lastName" className={labelStyle}>
            Nachname:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={inputStyle}
            required
          />
        </div>
        <div className="pt-3">
          <label htmlFor="street" className={labelStyle}>
            Straße:
          </label>
          <input type="text" name="street" id="street" className={inputStyle} required />
        </div>
        <div className="pt-3">
          <label htmlFor="number" className={labelStyle}>
            Haus-Nr:
          </label>
          <input type="text" name="number" id="number" className={inputStyle} required />
        </div>
        <div className="pt-3">
          <label htmlFor="zip" className={labelStyle}>
            PLZ:
          </label>
          <input type="text" name="zip" id="zip" className={inputStyle} required />
        </div>
        <div className="pt-3">
          <label htmlFor="email" className={labelStyle}>
            E-Mail:
          </label>
          <input type="email" name="email" id="email" className={inputStyle} required />
        </div>
        <div className="pt-3">
          <label htmlFor="password" className={labelStyle}>
            Passwort:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={inputStyle}
            required
          />
        </div>
        <div className="pt-3">
          <label htmlFor="confirmPassword" className={labelStyle}>
            Passwort bestätigen:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={inputStyle}
            required
          />
        </div>
      </div>

      <button className={buttonStyle} disabled={loading}>
        {loading ? 'Lädt...' : 'Abschicken'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default UserRegister;