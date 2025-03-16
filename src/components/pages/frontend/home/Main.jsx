import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { InputPhotoUpload } from "@/components/helpers/FormInputs";
import { imgPath } from "@/components/helpers/functions-general";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto("");
  const navigate = useNavigate();
  const [photoError, setPhotoError] = useState(false);

  const handleUpload = async () => {
    if (!photo) {
      setPhotoError(true);
      return;
    }
    setPhotoError(false);

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/Count", {
          state: {
            photo: URL.createObjectURL(photo),
            detections: data.detections,
          },
        });
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <section className="bg-green-950 h-screen flex flex-col items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-2xl">Upload an Image</h1>
      </div>

      <div className="mt-5">
        <input type="file" accept="image/*" onChange={(e) => handleChangePhoto(e)} />
      </div>

      {photoError && <p className="text-red-500">Please upload an image before proceeding.</p>}

      <div className="mt-5">
        <button onClick={handleUpload} className="bg-green-700 text-white px-5 py-2 rounded">
          Detect Coconuts
        </button>
      </div>
    </section>
  );
};

export default Main;