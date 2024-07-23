import { useContext, useState } from "react";
import {
  inputStyle,
  labelStyle,
  trashButton,
} from "../reuseable/styles/reuseableComponents.jsx";
import { UserContext } from "../context/userContext.jsx";

const UpdateProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [uploadImg, setUploadImg] = useState(null);
  // image Upload
  function handleImageUpload(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a file reader object
    // Define a callback function to be executed when file reading is complete
    reader.onloadend = () => {
      // Convert the image file to a base64 string
      const imageData = reader.result;
      // Update the state with the base64 string representing the uploaded image
      setUploadImg(imageData);
    };
    if (file) {
      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    }
  }
/*   function handleButtonClick() {
    // Trigger the file input click event programmatically
    document.getElementById("image").click();
  } */
  function handleDeleteImage() {
    // Reset the uploaded image state
    setUploadImg(null);
  }
  // Trash symbol
  const trash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
  // Function to handle delete form field
  const onDelete = async (fieldName) => {
    console.log("fieldName:", fieldName);
    try {
      const res = await fetch(`http://localhost:5500/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          [fieldName]: null,
        }),
      });
      const data = await res.json();
      setUserData(data.user);
      alert("Removed successfully!");
    } catch (error) {
      console.log(error);
    }
    // window.location.reload();
    return;

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData };
      // Delete the targeted field
      delete updatedUserData[fieldName];
      return updatedUserData;
    });
  };

  // Function to handle form submission
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataProps = Object.fromEntries(formData);
    // console.log(formDataProps);
    const updatedData = {};
    for (let nameAttr in formDataProps) {
      // console.log(nameAttr);
      if (formDataProps[nameAttr] !== "") {
        updatedData[nameAttr] = formDataProps[nameAttr];
      }
    }
    console.log("updatedData:", updatedData);
    try {
      const res = await fetch(`http://localhost:5500/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...updatedData,
        }),
      });
      const data = await res.json();
      setUserData(data.user);
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  
/* // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const updatedData = {};

  // Iterate over each form field
  formData.forEach((value, key) => {
    // Exclude email and image fields
    if (key !== 'email' && key !== 'image') {
      updatedData[key] = value;
    }
  });

  console.log("updatedData:", updatedData);

  try {
    const res = await fetch(`http://localhost:5500/edit/${userData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...updatedData,
      }),
    });
    const data = await res.json();
    setUserData(data.user);
    alert("Profile updated successfully!");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}; */


  return (
    <section className="flex justify-center  min-h-screen w-full">
      <div className="relative">
        <div className="reusableSquare absolute" style={{ "--i": 0 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 1 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 2 }}></div>
        {/*  <div className="reusableSquare absolute" style={{ "--i": 3 }}></div> */}
        {/* <div className="reusableSquare absolute" style={{ "--i": 4 }}></div> */}
        <div className="reusableContainer  mt-12 shadow-md">
          <form className="reusableForm" onSubmit={(e) => handleSubmit(e)}>
            <div className="profile-image-upload ">
              {uploadImg ? (
                <div className="image-preview flex justify-center ">
                  <img
                    src={uploadImg}
                    alt="Profile "
                    className="w-[200px] h-[200px] object-cover rounded-full mx-auto"
                  />
                  <button
                    onClick={handleDeleteImage}
                    className="delete-image-button"
                  >
                    🗑️
                  </button>
                </div>
              ) : (
                <div className="image-placeholder ">
                  <img
                    src="../avatar-icon.jpg"
                    alt="Placeholder"
                    className="w-[200px] h-[200px] object-cover rounded-full mx-auto"
                  />
                </div>
              )}
              <label
                htmlFor="image"
                className="file-input-label block text-center mt-4"
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageUpload}
                  className="file-input hidden"
                />
                <span className="reusableFormBtn mt-2">Bild wählen</span>
              </label>
            </div>
            <h3 className="reusableH3 m-2 ">Hi {userData.firstName},</h3>
            <textarea
              name="aboutMe"
              id="aboutMe"
              cols="30"
              rows="5"
              placeholder="Hier kannst du dich mit deinen eigenen Worten vorstellen."
              defaultValue={userData.aboutMe || ""}
              className="about-me-textarea"
            ></textarea>
            {/* <div>
            <label htmlFor="groups">Groups:</label>
            <select
              multiple
              value={userData.groups}
              // onChange={handleSelectChange}
              id="groups"
              name="groups"
            >
              
              {userData.groups}
            </select>
          </div> */}
          <div className="relative">
              <label htmlFor="email" className={labelStyle}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={userData.email}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="firstName" className={labelStyle}>
                firstName:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("firstName")}
                >
                  {trash}
                </button>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder={userData.firstName}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="lastName" className={labelStyle}>
                lastName:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("lastName")}
                >
                  {trash}
                </button>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder={userData.lastName}
                className={inputStyle}
              />
            </div>
            
            <div className="relative">
              <label htmlFor="street" className={labelStyle}>
                Street:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("street")}
                >
                  {trash}
                </button>
              </label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder={userData.address[0].street}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="number" className={labelStyle}>
                Number:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("number")}
                >
                  {trash}
                </button>
              </label>
              <input
                type="text"
                id="number"
                name="number"
                placeholder={userData.address[0].number}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="zip" className={labelStyle}>
                ZIP:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("zip")}
                >
                  {trash}
                </button>
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder={userData.address[0].zip}
                className={inputStyle}
              />
            </div>
            {/* Add other form fields as needed */}
            <button type="submit" className="reusableFormBtn mt-2">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
