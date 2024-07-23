export const handleImageUpload = (e, setUploadImg) => {
  const image = e.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    setUploadImg(reader.result);
  };
  reader.readAsDataURL(image);
};
