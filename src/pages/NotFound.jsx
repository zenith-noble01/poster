import React from "react";

const NotFound = () => {
  const [file, setFile] = React.useState(null);
  const [resizedImage, setResizedImage] = React.useState(null);

  const resizeImage = ({ file, maxWidth, maxHeight }) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (event) => {
    const maxWidth = 800;
    const maxHeight = 600;
    const file = event.target.files[0];
    setFile(file);
    const resizedImage = await resizeImage({ file, maxWidth, maxHeight });
    setResizedImage(resizedImage);
  };

  console.log(resizedImage);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {resizedImage && (
        <img src={URL.createObjectURL(resizedImage)} alt="Resized" />
      )}
    </div>
  );
};

export default NotFound;
