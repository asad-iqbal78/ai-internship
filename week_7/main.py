from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import easyocr
import cv2
import numpy as np
import os

app = FastAPI()

model = YOLO("models/best.pt")

reader = easyocr.Reader(['en'], gpu=False)

os.makedirs("uploads", exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Week 7 ANPR API is running",
        "model": "YOLO + EasyOCR loaded successfully"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    print("1. Image received")

    # Read uploaded image
    image_bytes = await file.read()
    print("2. Image bytes read")

    # Convert image to OpenCV image
    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    print("3. Image converted")

    # Run YOLO
    print("4. YOLO started")
    results = model(image)
    print("5. YOLO finished")

    detections = []

    for result in results:

        for box in result.boxes:

            print("6. License plate detected")

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Crop plate
            plate_crop = image[y1:y2, x1:x2]

            print("7. Plate cropped")

            # OCR
            print("8. EasyOCR started")
            ocr_results = reader.readtext(plate_crop)
            print("9. EasyOCR finished")

            plate_text = ""

            if ocr_results:
                plate_text = " ".join(
                    [text for (_, text, _) in ocr_results]
                )

            detections.append({
                "plate_text": plate_text,
                "bounding_box": {
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2
                }
            })

    print("10. Sending response")

    return {
        "filename": file.filename,
        "detections": detections
    }