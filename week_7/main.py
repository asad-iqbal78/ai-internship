from fastapi import FastAPI, UploadFile, File, HTTPException
from ultralytics import YOLO
import easyocr
import cv2
import numpy as np
import os

app = FastAPI(
    title="Week 7 ANPR API",
    description="License plate detection and OCR API",
    version="1.0.0"
)

try:
    model = YOLO("models/best.pt")
except Exception as e:
    model = None
    print(f"Model loading error: {e}")

try:
    reader = easyocr.Reader(["en"], gpu=False)
except Exception as e:
    reader = None
    print(f"OCR loading error: {e}")

ALLOWED_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/jfif"
}


@app.get("/")
def home():
    return {
        "message": "Week 7 ANPR API is running",
        "model": "YOLO + EasyOCR"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file was provided."
        )

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload JPG, JPEG, PNG, WEBP, or JFIF image."
        )

    try:
        print("1. Image received")

        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file is empty."
            )

        print("2. Image bytes read")

        image_array = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        if image is None:
            raise HTTPException(
                status_code=400,
                detail="The uploaded file is not a valid image."
            )

        print("3. Image converted")

        if model is None:
            raise HTTPException(
                status_code=503,
                detail="License plate detection model is not available."
            )

        if reader is None:
            raise HTTPException(
                status_code=503,
                detail="OCR service is not available."
            )

        print("4. YOLO started")
        results = model(image)
        print("5. YOLO finished")

        detections = []

        for result in results:

            for box in result.boxes:

                print("6. License plate detected")

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                height, width = image.shape[:2]

                x1 = max(0, min(x1, width))
                x2 = max(0, min(x2, width))
                y1 = max(0, min(y1, height))
                y2 = max(0, min(y2, height))

                plate_crop = image[y1:y2, x1:x2]

                if plate_crop.size == 0:
                    continue

                print("7. Plate cropped")

                print("8. EasyOCR started")
                ocr_results = reader.readtext(plate_crop)
                print("9. EasyOCR finished")

                plate_text = ""

                if ocr_results:
                    plate_text = " ".join(
                        text for (_, text, _) in ocr_results
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

    except HTTPException:
        raise

    except Exception as e:
        print(f"Prediction error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Prediction failed. Please check the uploaded image and try again."
        )