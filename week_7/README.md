# Week 7 - ANPR API

## Project Overview

This project implements an Automatic Number Plate Recognition (ANPR) API using FastAPI, YOLO, and EasyOCR.

The system takes a vehicle image as input, detects the license plate using YOLO, crops the detected plate, and reads the plate number using EasyOCR.

## Technologies Used

* Python
* FastAPI
* Uvicorn
* YOLO
* Ultralytics
* EasyOCR
* OpenCV
* PyTorch

## Project Structure

```text
week_7/
│
├── main.py
├── download_model.py
├── requirements.txt
├── README.md
│
├── models/
│   └── best.pt
│
└── uploads/
```

## Setup

Create and activate a virtual environment:

```powershell
python -m venv venv
venv\Scripts\activate
```

Install the required packages:

```powershell
pip install -r requirements.txt
```

## Run the API

Start the FastAPI server:

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

## API Endpoint

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

## Example Response

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

## ANPR Pipeline

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

The API was tested using a vehicle image named `car1.jfif`.

Detected license plate:

```text
LEF 3503
```

The API returned HTTP status:

```text
200 OK
```
