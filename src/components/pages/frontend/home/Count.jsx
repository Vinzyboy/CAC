import { imgPath } from "@/components/helpers/functions-general";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fileSave } from "browser-fs-access";

const Count = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const photo = location.state?.photo || null; // Retrieved image
  const [image, setImage] = useState(location.state?.photo || null);

  const detections = location.state?.detections || []; // Coconut detection results
  const totalCoconuts = detections.length; // Count coconuts detected

  const [showModal, setShowModal] = useState(false); // Modal state
  const [actionType, setActionType] = useState(""); // Tracks action type

  const handleRetryClick = () => {
    setActionType("retry");
    setShowModal(true);
  };

  const saveBase64Image = async (
    base64String,
    filename = "coconut_detection.png"
  ) => {
    try {
      const byteCharacters = Uint8Array.from(atob(base64String), (c) =>
        c.charCodeAt(0)
      );
      const blob = new Blob([byteCharacters], { type: "image/png" });

      // Open save dialog
      await fileSave(blob, {
        fileName: filename,
        extensions: [".png"],
        description: "png Image",
        mimeTypes: ["image/png"],
      });
      console.log("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  // const handleSaveClick = async () => {
  //   if (!photo) {
  //     alert("No image to save!");
  //     return;
  //   }
  //   saveBase64Image(photo);
  //   //     try {
  //   //       const blob = await fetch(photo).then((res) => res.blob());
  //   //       const formData = new FormData();
  //   //       formData.append("image", blob, "coconut_detection.png");
  //   //
  //   //       const response = await fetch("http://localhost:5000/upload", {
  //   //         method: "POST",
  //   //         body: formData,
  //   //       });
  //   //
  //   //       if (response.ok) {
  //   //         alert("Image saved successfully!");
  //   //       } else {
  //   //         alert("Failed to save image.");
  //   //       }
  //   //     } catch (error) {
  //   //       console.error("Error saving image:", error);
  //   //       alert("Error saving image.");
  //   //     }
  // };

  const handleSaveClick = async () => {
    if (!image) {
      alert("No image to save!");
      return;
    }

    await saveBase64Image(image);

    // Clear the image after saving
    setImage(null);
    alert("Image saved successfully!");
  };

  const handleConfirm = () => {
    setShowModal(false);
    if (actionType === "retry") {
      navigate("/Main"); // Navigate back to main page
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal
  };

  return (
    <>
      <section className="bg-green-950 h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl">Detection Results</h1>
        </div>

        <div className="flex flex-col items-center gap-10 mt-10">
          {/* Display Image */}
          <div>
            <img
              src={
                image
                  ? `data:image/png;base64, ${image}`
                  : `${imgPath}/banner1.png`
              }
              alt="Detected Coconuts"
              className="h-[400px] border-2 border-white"
            />
          </div>

          {/* Display Coconut Count */}
          <div className="flex gap-5 text-white">
            <h3>Total</h3>
            <input
              type="text"
              value={totalCoconuts} // Display detected count
              readOnly
              className="bg-transparent border border-gray-500 rounded-md p-2 text-white text-center"
            />
          </div>

          {/* Buttons: Save & Retry */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              className="bg-green-900 text-white px-5 py-2 rounded hover:bg-green-700"
              type="button"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="btn-cancel text-white px-5 py-2 rounded "
              onClick={handleRetryClick}
            >
              Retry
            </button>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to {actionType}?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="btn-cancel text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Count;
