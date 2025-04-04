import React, { useContext, useState } from 'react';
import { inputStyle, labelStyle, trashButton } from "../reuseable/styles/reuseableComponents.jsx";
import { UserContext } from "../context/userContext.jsx";
import { getBaseUrl } from '../../utils/envUtils.js';
import useCloudinary from '../reuseable/useCloudinary.js';

const UpdateProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [uploadImg, setUploadImg] = useState(userData.image || null);
  const [formData, setFormData] = useState({
    aboutMe: userData.aboutMe || "",
    email: userData.email || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    street: userData.address[0]?.street || "",
    number: userData.address[0]?.number || "",
    zip: userData.address[0]?.zip || ""
  });

  const { cloudinary, loading, error } = useCloudinary();
  const baseUrl = getBaseUrl();

  const handleImageUpload = (error, result) => {
    if (error) {
      console.error('Upload error:', error);
      return;
    }
    // console.log('Image upload result:', result); // Debugging line
    if (result && result.event === 'success') {
      setUploadImg(result.info.secure_url);
    } else {
      console.error('Upload result is not successful:', result);
    }
  };

  const handleDeleteImage = () => {
    setUploadImg(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      image: uploadImg || userData.image
    };

    if (!updatedData.email || updatedData.email.trim() === '') {
      alert('Email cannot be empty.');
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data.user);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClick = () => {
    if (cloudinary) {
      cloudinary.openUploadWidget(
        {
          cloudName: 'detcmp1w9', // Replace with your Cloudinary cloud name
          uploadPreset: 'mq5nxvzz', // Replace with your Cloudinary upload preset
        },
        handleImageUpload
      );
    } else {
      console.error('Cloudinary is not loaded or available');
    }
  };

  const onDelete = async (fieldName) => {
    try {
      const res = await fetch(`${baseUrl}/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ [fieldName]: null }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data.user);
        alert("Removed successfully!");
      } else {
        alert(data.message || "Failed to remove field");
      }
    } catch (error) {
      console.error('Error removing field:', error);
    }
  };

  if (loading) return <p>Loading Cloudinary...</p>;
  if (error) return <p>Error loading Cloudinary: {error.message}</p>;

  return (
    <section className="flex justify-center min-h-screen w-full">
      <div className="relative">
        <div className="reusableSquare absolute" style={{ "--i": 0 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 1 }}></div>
        <div className="reusableSquare absolute" style={{ "--i": 2 }}></div>
        <div className="reusableContainer mt-12 shadow-md">
          <form className="reusableForm" onSubmit={handleSubmit}>
            <div className="profile-image-upload">
              {uploadImg ? (
                <div className="image-preview flex justify-center">
                  <img
                    src={uploadImg}
                    alt="Profile"
                    className="w-[200px] h-[200px] object-cover rounded-full mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="delete-image-button"
                  >
                    🗑️
                  </button>
                </div>
              ) : (
                <div className="image-placeholder flex justify-center">
                  <img
                    src="../avatar-icon.jpg" // Placeholder image
                    alt="Placeholder"
                    className="w-[200px] h-[200px] object-cover rounded-full mx-auto"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={handleClick}
                className="reusableFormBtn mt-2"
                disabled={!cloudinary}
              >
                Choose Image
              </button>
            </div>
            <h3 className="reusableH3 m-2">Hi {userData.firstName},</h3>
            <textarea
              name="aboutMe"
              id="aboutMe"
              cols="30"
              rows="5"
              placeholder="Here you can introduce yourself."
              value={formData.aboutMe}
              onChange={handleChange}
              className="about-me-textarea"
            ></textarea>
            <div className="relative">
              <label htmlFor="email" className={labelStyle}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="firstName" className={labelStyle}>
                First Name:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("firstName")}
                >
                  🗑️
                </button>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="lastName" className={labelStyle}>
                Last Name:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("lastName")}
                >
                  🗑️
                </button>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
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
                  🗑️
                </button>
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
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
                  🗑️
                </button>
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
            <div className="relative">
              <label htmlFor="zip" className={labelStyle}>
                Zip:
                <button
                  type="button"
                  className={trashButton}
                  onClick={() => onDelete("zip")}
                >
                  🗑️
                </button>
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
            <button type="submit" className="reusableFormBtn mt-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
