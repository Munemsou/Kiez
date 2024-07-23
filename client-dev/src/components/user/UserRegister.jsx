import "../reuseable/styles/reusableFormComponents.css";
import "../reuseable/styles/reusableGlobal.css";

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

    if (geoCodeData) {
      body.geoCode = [geoCodeData[0], geoCodeData[1]];
      // const body = {
      //   firstName: el.firstName.value,
      //   lastName: el.lastName.value,
      //   email: el.email.value,
      //   password: el.password.value,
      //   confirmPassword: el.confirmPassword.value,
      //   address: [body.address],
      //   geoCode: [geoCodeData[0], geoCodeData[1]],
      // };

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
      console.log({ data });
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
    <section className="flex  justify-center items-center mt-32 w-full">
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="reusableGlobalBackground absolute"></div>
      <div className="relative">
        <div className="reusableSquare absolute" style={{ "--i": 0 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 1 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 2 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 3 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 4 }}></div>
        <div className="reusableContainer reusableBorder mt-12 shadow-md">
          <form className="reusableForm" onSubmit={submitHandler}>
            <div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-800"
                >
                  Vorname:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="pt-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-800"
                >
                  Nachname:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="pt-3">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-800"
                >
                  Straße:
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="pt-3">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-800"
                >
                  Haus-Nr:
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="pt-3">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-800"
                >
                  PLZ:
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="pt-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  E-Mail:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="pt-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Passwort:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="pt-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-800"
                >
                  Passwort bestätigen:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="reusableInput mt-1  p-2 text-gray-800 block w-full border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <button className="reusableFormBtn ">Abschicken</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
