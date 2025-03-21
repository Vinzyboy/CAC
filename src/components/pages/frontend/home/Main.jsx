import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { InputPhotoUpload } from "@/components/helpers/FormInputs";
import { imgPath } from "@/components/helpers/functions-general";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ImagePlusIcon } from "lucide-react";
import { Formik } from "formik";
import * as Yup from "Yup";

const Main = () => {
  const { handleChangePhoto, photo } = useUploadPhoto();
  const navigate = useNavigate();
  const [photoError, setPhotoError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUpload = async () => {
    if (!photo) {
      setPhotoError(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const response = await axios.post(
        "http://localhost:5001/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        navigate("/Count", {
          state: {
            photo: response.data.image_base64,
            detections: response.data.detections,
          },
        });
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleCancel = () => {
    if (!photo) {
      navigate("/"); // Redirect to home if no photo is uploaded
    } else {
      handleChangePhoto({ target: { files: [] } }); // Clear the uploaded photo
      setPhotoError(false);
    }
  };

  const initVal = {};
  const yupSchema = Yup.object({});

  return (
    <section className="bg-green-950 h-screen flex flex-col items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-2xl">Upload an Image</h1>
      </div>

      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (!photo) {
            setPhotoError(true);
            return;
          }
          setPhotoError(false);
          navigate("/Count", {
            state: { photo: URL.createObjectURL(photo) },
          });
          setSubmitting(false);
        }}
      >
        {(props) => {
          return (
            <div className="input-wrap relative group input-photo-wrap min-h-[540px] flex justify-center items-center bg-green-950">
              {/* Conditional Border: Only show if no image is uploaded */}
              {photo === null && (
                <div className="border border-line absolute h-[400px] w-[400px] rounded-md border-opacity-50 group-hover:border-opacity-70"></div>
              )}

              {photo === null ? (
                <div className="w-full rounded-md flex justify-center items-center flex-col h-full">
                  <ImagePlusIcon
                    size={50}
                    strokeWidth={1}
                    className="opacity-20 group-hover:opacity-50 transition-opacity"
                  />
                  <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                    Upload Photo
                  </small>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded Photo"
                  className="relative max-h-[540px] max-w-full w-auto h-auto object-contain"
                />
              )}

              <InputPhotoUpload
                name="photo"
                type="file"
                id="photo"
                accept="image/*"
                title="Upload photo"
                onChange={(e) => handleChangePhoto(e)}
                onDrop={(e) => handleChangePhoto(e)}
                className="opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full m-auto cursor-pointer w-full h-full"
              />
            </div>
          );
        }}
      </Formik>

      {photoError && (
        <p className="text-red-500">
          Please upload an image before proceeding.
        </p>
      )}

      <div className="mt-5 flex gap-5">
        <button
          className="btn btn-cancel px-6"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          onClick={handleUpload}
          className="bg-green-700 text-white px-5 py-2 rounded"
        >
          Detect Coconuts
        </button>
      </div>
    </section>
  );
};

export default Main;
