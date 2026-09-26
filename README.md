# AI Internship – 8 Week Journey

A complete 8-week Artificial Intelligence internship journey covering Python, data analysis, machine learning, deep learning, computer vision, OCR, API development, and full-stack AI application deployment.

This repository contains my weekly work, notebooks, experiments, APIs, and final full-stack AI project developed throughout the internship.

---

## 👨‍💻 About Me

**Name:** Asad Iqbal  
**Program:** BS Software Engineering  
**University:** PMAS Arid Agriculture University, Rawalpindi  
**Internship:** AI Internship – 8 Weeks  
**Focus:** Artificial Intelligence, Machine Learning, Computer Vision & Full-Stack AI

### Background

Before starting this internship, I had experience in:

- JavaScript (ES6+)
- React
- Node.js
- Express.js
- MongoDB
- MySQL
- Git & GitHub
- Full-stack web development
- Web application deployment

### Internship Goal

The goal of this internship was to add practical Artificial Intelligence and Machine Learning skills to my existing full-stack development background and build an AI application from model development to API integration and final deployment.

---

# 🗺️ Internship Roadmap

| Week | Topic | Main Focus |
|------|-------|------------|
| Week 1 | Python for a JavaScript Developer | Python, NumPy, Pandas |
| Week 2 | Data Exploration and Plots | Data cleaning, analysis and visualization |
| Week 3 | First Machine Learning Model | Classification and evaluation |
| Week 4 | Better Models and Evaluation | Decision Trees, Random Forest and validation |
| Week 5 | Deep Learning with PyTorch | Neural networks and training |
| Week 6 | Object Detection and OCR | YOLO and EasyOCR |
| Week 7 | Model API | FastAPI ANPR backend |
| Week 8 | Full-Stack AI App | React frontend, API integration and deployment |

---

# 📚 Week 1 – Python for a JavaScript Developer

The first week focused on learning Python from the perspective of a JavaScript developer.

### Topics Covered

- Python syntax
- Variables and data types
- Lists
- Dictionaries
- Functions
- List comprehensions
- Classes
- NumPy arrays
- Pandas DataFrames
- CSV data loading
- Filtering data
- Summary statistics
- Google Colab

### Deliverable

A Python/Google Colab notebook demonstrating dataset loading, filtering and summary statistics.

---

# 📊 Week 2 – Data Exploration and Visualization

The second week focused on understanding and exploring real datasets.

### Topics Covered

- Data cleaning
- Missing values
- Data types
- Data filtering
- Grouping and aggregation
- Exploratory Data Analysis (EDA)
- Matplotlib
- Data visualization
- Finding patterns in datasets

### Deliverable

An exploratory data analysis notebook containing cleaned data, visualizations and observations.

---

# 🤖 Week 3 – First Machine Learning Model

The third week introduced the fundamentals of machine learning.

### Topics Covered

- Training data
- Testing data
- Features and target variables
- Classification
- Model training
- Model prediction
- Accuracy
- Confusion matrix
- Scikit-learn

### Deliverable

A machine learning classification notebook containing model training, predictions and evaluation.

---

# 🌳 Week 4 – Better Models and Honest Evaluation

The fourth week focused on improving model selection and evaluation.

### Topics Covered

- Decision Trees
- Random Forest
- Overfitting
- Cross-validation
- Feature scaling
- Model comparison
- Model evaluation

### Deliverable

A model comparison notebook containing multiple models, results and evaluation.

---

# 🧠 Week 5 – Deep Learning with PyTorch

The fifth week introduced neural networks and deep learning using PyTorch.

### Topics Covered

- Tensors
- Neural networks
- PyTorch
- Autograd
- Forward pass
- Loss functions
- Backpropagation
- Optimizers
- Training loops
- Loss curves
- Model accuracy

### Deliverable

A PyTorch neural network classifier with training-loop implementation, loss visualization and evaluation.

---

# 👁️ Week 6 – Object Detection and OCR

Week 6 focused on computer vision and the main AI pipeline used in the final ANPR project.

## Technologies

- YOLO
- Ultralytics
- EasyOCR
- OpenCV
- NumPy
- PyTorch

## ANPR Pipeline

The project combines two main computer vision tasks:

```text
Vehicle Image
      ↓
YOLO Object Detection
      ↓
License Plate Detection
      ↓
Crop Detected Plate
      ↓
EasyOCR
      ↓
Recognize Plate Characters
      ↓
License Plate Text
Deliverable

A computer vision notebook capable of detecting a license plate and reading text from the detected region.

⚙️ Week 7 – ANPR API with FastAPI

In Week 7, the ANPR model was converted into a backend API using FastAPI.

Features
Image upload
File validation
License plate detection
License plate cropping
OCR processing
JSON response
Bounding box coordinates
Error handling
Postman testing
Backend API

The backend is deployed on Hugging Face Spaces.

API:
https://asadIqbal123-anpr-api.hf.space

API Endpoints
GET  /health
GET  /docs
POST /predict
Example Response
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
Deliverable

A working FastAPI service that accepts a vehicle image and returns license plate detection and OCR results.

🌐 Week 8 – Full-Stack AI Application

Week 8 was the final stage of the internship.

The goal was to build a complete web application around the Week 7 AI API.

