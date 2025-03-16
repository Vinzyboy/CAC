const express = require("express");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const port = 5000;

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    const detectionResponse = await axios.post(
      "http://localhost:5001/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    // Delete the file after processing
    fs.unlinkSync(req.file.path);

    res.json({
      message: "Image uploaded and detected successfully",
      filename: req.file.filename,
      detections: detectionResponse.data.detections,
    });
  } catch (error) {
    console.error("Detection error:", error);
    res.status(500).json({ error: "Detection failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});