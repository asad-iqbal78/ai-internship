# Week 7 - ANPR (Automatic Number Plate Recognition)

## Project Overview

This project implements an **Automatic Number Plate Recognition (ANPR)** system using **YOLO and EasyOCR**.

The system takes a vehicle image as input, detects the license plate using YOLO, crops the detected plate, and reads the plate number using EasyOCR.

The project was initially developed as a **FastAPI API** and is now also deployed as a **Gradio application on Hugging Face Spaces**.

## Technologies Used

* Python
* FastAPI
* Uvicorn
* Gradio
* YOLO
* Ultralytics
* EasyOCR
* OpenCV
* NumPy
* PyTorch
* Hugging Face Spaces

## Project Structure

```text
week_7/

├── main.py
├── app.py
├── download_model.py
├── requirements.txt
├── README.md
│
├── models/
│   └── best.pt
│
└── uploads/
```

## Local Setup

Create and activate a virtual environment:

```powershell
python -m venv venv
venv\Scripts\activate
```

Install the required packages:

```powershell
pip install -r requirements.txt
```

## Local FastAPI API

The original project includes a FastAPI backend.

Start the API using:

```powershell
uvicorn main:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

## FastAPI Endpoint

### POST `/predict`

The endpoint accepts a vehicle image and returns the detected license plate text and its bounding box.

### Request

Method:

```text
POST
```

URL:

```text
http://127.0.0.1:8000/predict
```

Body:

```text
form-data
```

Field:

```text
file = vehicle image
```

## Example FastAPI Response

```json
{
    "filename": "car1.jfif",
    "detections": [
        {
            "plate_text": "LEF 3503",
            "bounding_box": {
                "x1": 325,
                "y1": 157,
                "x2": 417,
                "y2": 214
            }
        }
    ]
}
```

## Hugging Face Deployment

The ANPR application has also been deployed on Hugging Face Spaces using:

* Gradio
* ZeroGPU
* YOLO
* EasyOCR

Live Space:

[ANPR API — Hugging Face Space](https://huggingface.co/spaces/asadIqbal123/anpr-api?utm_source=chatgpt.com)

The deployed application allows users to upload a vehicle image and receive the detected license plate number.

## ANPR Pipeline

```text
Vehicle Image
      ↓
Gradio Interface
      ↓
YOLO License Plate Detection
      ↓
License Plate Crop
      ↓
EasyOCR
      ↓
Plate Number
      ↓
JSON Result
```

For the original local API:

```text
Vehicle Image
      ↓
FastAPI
      ↓
YOLO License Plate Detection
      ↓
License Plate Crop
      ↓
EasyOCR
      ↓
Plate Number
      ↓
JSON Response
```

## Testing

The system was tested using a vehicle image containing a license plate.

Example detected plate:

```text
3503 LEF
```

The deployed Hugging Face application successfully detected the license plate and returned its bounding box.

Example result:

```json
[
    {
        "plate_text": "3503 LEF",
        "bounding_box": {
            "x1": 327,
            "y1": 157,
            "x2": 417,
            "y2": 213
        }
    }
]
```

## cURL Testing - Local FastAPI

### Valid Image Request

```bash
curl -X POST "http://127.0.0.1:8000/predict" -F "file=@car1.jfif"
```

Example response:

```json
{
    "filename": "car1.jfif",
    "detections": [
        {
            "plate_text": "LEF 3503",
            "bounding_box": {
                "x1": 325,
                "y1": 157,
                "x2": 417,
                "y2": 214
            }
        }
    ]
}
```

### Invalid File Request

If an unsupported file type is uploaded, the API returns:

```json
{
    "detail": "Invalid file type. Please upload JPG, JPEG, PNG, WEBP, or JFIF image."
}
```

HTTP status:

```text
400 Bad Request
```

## Key Features

* License plate detection using YOLO
* License plate text recognition using EasyOCR
* Bounding box detection
* Image upload support
* FastAPI REST API
* Swagger API documentation
* Gradio web interface
* Hugging Face deployment
* GPU acceleration through ZeroGPU

## Conclusion

The Week 7 ANPR project demonstrates an end-to-end license plate recognition pipeline using modern computer vision and OCR technologies.

The system can detect vehicle license plates, extract the plate region, recognize the plate text, and return the detection results.
