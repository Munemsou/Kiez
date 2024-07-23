/* // vlt. auslagern in extra datei
export const inputStyle = "w-full border-2 rounded focus:outline-none text-black"

export const buttonStyle = "bg-green-200  text-slate-700 p-2 rounded w-full dark:text-slate-600 mt-2  font-light hover:font-medium" */

import {
  buttonStyle,
  inputStyle,
  labelStyle,
} from "./reuseable/styles/reuseableComponents.jsx";

const UserRegister = () => {
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
      const body = {
        firstName: el.firstName.value,
        lastName: el.lastName.value,
        email: el.email.value,
        password: el.password.value,
        confirmPassword: el.confirmPassword.value,
        address: [body.address],
        geoCode: [geoCodeData[0], geoCodeData[1]],
      };

      // Send the registration data to the server
      const response = await fetch("http://localhost:5500/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // Process the response
      const data = await response.json();
      console.log(data);
      event.target.reset();
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
        // console.log("latitude:", latitude, "longitude:", longitude );

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

        {/* <div>
          <label htmlFor="username" className="border-b-2 w-80">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className={inputStyle}
          />
        </div> */}
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
