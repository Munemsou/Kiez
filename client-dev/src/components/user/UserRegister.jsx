import {
  buttonStyle,
  inputStyle,
  labelStyle,
} from "../reuseable/styles/reuseableComponents.jsx";
import { getBaseUrl } from '../../utils/envUtils.js';

const UserRegister = () => {
  const baseUrl = getBaseUrl();

  const submitHandler = async (event) => {
    event.preventDefault();
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

    // Call getGeoCodeData with the address synchronously
    const geoCodeData = await getGeoCodeData(body.address);

    console.log("GEO CODE DATA [0]: -> ", geoCodeData[0]);

    if (geoCodeData) {
      const bodyWithGeo = {
        firstName: el.firstName.value,
        lastName: el.lastName.value,
        email: el.email.value,
        password: el.password.value,
        confirmPassword: el.confirmPassword.value,
        address: [body.address],
        geoCode: [geoCodeData[0], geoCodeData[1]],
      };

      // Send the registration data to the server
      try {
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
        console.log(data);
        event.target.reset();
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  // Define the getGeoCodeData function
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
      className="h-fit flex flex-col justify-center gap-3 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl "
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
          />
        </div>
        <div className="pt-3">
          <label htmlFor="street" className={labelStyle}>
            Straße:
          </label>
          <input type="text" name="street" id="street" className={inputStyle} />
        </div>
        <div className="pt-3">
          <label htmlFor="number" className={labelStyle}>
            Haus-Nr:
          </label>
          <input type="text" name="number" id="number" className={inputStyle} />
        </div>
        <div className="pt-3">
          <label htmlFor="zip" className={labelStyle}>
            PLZ:
          </label>
          <input type="text" name="zip" id="zip" className={inputStyle} />
        </div>
        <div className="pt-3">
          <label htmlFor="email" className={labelStyle}>
            E-Mail:
          </label>
          <input type="email" name="email" id="email" className={inputStyle} />
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
          />
        </div>
      </div>

      <button className={buttonStyle}>Abschicken</button>
    </form>
  );
};

export default UserRegister;
