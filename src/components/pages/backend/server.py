import pathlib
import os
import torch
import io
from flask import Flask, request, jsonify, Response
from PIL import Image
from flask_cors import CORS

temp = pathlib.WindowsPath
pathlib.PosixPath = temp

app = Flask(__name__)
CORS(app)  # This allows all origins (use only in development)

# Load YOLOv5 Model Once
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "best.pt")
model = torch.hub.load("ultralytics/yolov5", "custom", path=MODEL_PATH, force_reload=True)  # Load YOLOv5 model
model.eval()

allowed_extensions = {"jpg", "jpeg", "png"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route("/predict", methods=['GET', 'POST'])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    if not allowed_file(image.filename) or not image.mimetype.startswith('image/'):
        return jsonify({"error": f"Invalid file format. Allowed formats: {', '.join(allowed_extensions)}"}), 400

    try:
        img = Image.open(io.BytesIO(image.read())).convert("RGB")

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
    app.run(host="127.0.0.1", port=5001, debug=True)