import base64
import pathlib
import os

import cv2
import torch
import io
from flask import Flask, request, jsonify, Response
from PIL import Image
from flask_cors import CORS
import numpy as np

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


def image_to_base64(image):
  _, buffer = cv2.imencode('.jpg', image)
  base64_str = base64.b64encode(buffer).decode('utf-8')
  return base64_str


def draw_boxes(image, detections):
  height, width, _ = image.shape  # Get image resolution

  # Scale thickness and font size dynamically
  base_width = 640
  scale_factor = max(width / base_width, 1)

  thickness = int(2 * scale_factor)
  font_scale = 0.4 * scale_factor
  text_thickness = max(int(1 * scale_factor), 1)

  for det in detections:
    xmin, ymin, xmax, ymax = int(det["xmin"]), int(det["ymin"]), int(det["xmax"]), int(det["ymax"])
    label = det["name"]
    confidence = det["confidence"]

    # Draw RED bounding box
    cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (0, 0, 255), thickness)

    # Prepare label text
    text = f"{confidence:.4f}"

    text_x = xmin
    text_y = ymin - 5 if ymin - 5 > 10 else ymin + 10

    cv2.putText(image, text, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), text_thickness,
                cv2.LINE_AA)
  return image


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

    detected_img = np.array(img)
    detected_img_bgr = cv2.cvtColor(detected_img, cv2.COLOR_RGB2BGR)
    detected_img_bgr = draw_boxes(detected_img_bgr, detections)
    base64_result = image_to_base64(detected_img_bgr)
    print(base64_result)

    # Count the number of coconuts detected
    coconut_count = sum(1 for det in detections if det["name"] == "coconut")

    return jsonify({
      "coconut_count": coconut_count,
      "detections": detections,
      "image_base64": base64_result
    })
  except Exception as e:
    return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
  app.run(host="127.0.0.1", port=5001, debug=True)
