import pathlib
import os
import torch
from flask import Flask, request, jsonify
from PIL import Image

temp = pathlib.WindowsPath
pathlib.PosixPath = temp

app = Flask(__name__)

# Load YOLOv5 Model Once
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "best.pt")
model = torch.hub.load("ultralytics/yolov5", "custom", path=MODEL_PATH, force_reload=True)  # Load YOLOv5 model
model.eval()

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        image = request.files["image"]
        img = Image.open(image).convert("RGB")

        # Perform YOLOv5 detection
        results = model(img)
        detections = results.pandas().xyxy[0].to_dict(orient="records")

        # Count the number of coconuts detected
        coconut_count = sum(1 for det in detections if det["name"] == "coconut")

        return jsonify({
            "coconut_count": coconut_count,
            "detections": detections
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)