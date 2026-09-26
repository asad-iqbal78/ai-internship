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

🚗 Final Project – ANPR Vision

ANPR Vision is a full-stack AI web application that detects vehicle license plates from uploaded images and reads the plate number using YOLO and EasyOCR.

The application connects a React frontend with the FastAPI AI backend.

🔄 How ANPR Vision Works
User
 ↓
Upload Vehicle Image
 ↓
React Frontend
 ↓
POST /predict
 ↓
FastAPI Backend
 ↓
YOLO License Plate Detection
 ↓
Crop Detected License Plate
 ↓
EasyOCR Text Recognition
 ↓
JSON Response
 ↓
React Frontend
 ↓
Display License Plate Result
✨ Final Project Features
Upload vehicle images
Detect license plates using YOLO
Recognize license plate text using EasyOCR
Display detected plate number
Display bounding box coordinates
Loading state while processing
Error handling for failed requests
Responsive web interface
FastAPI backend integration
Live frontend deployment
Live backend deployment
🛠️ Technologies Used
Frontend
React
Vite
JavaScript
HTML
CSS
Backend
FastAPI
Python
REST API
Artificial Intelligence
YOLO
Ultralytics
EasyOCR
OpenCV
NumPy
PyTorch
Machine Learning
Scikit-learn
Pandas
Matplotlib
Development Tools
Google Colab
Git
GitHub
Postman
Visual Studio Code
Deployment
Vercel
Hugging Face Spaces
🚀 Live Demo
Frontend

https://anpr-vision-ai.vercel.app/

The frontend allows users to upload a vehicle image and view the license plate detection and recognition result.

Backend API

https://asadIqbal123-anpr-api.hf.space

Interactive API Documentation

https://asadIqbal123-anpr-api.hf.space/docs

📸 Final Project Screenshots
1. Application Home Screen

2. Image Upload / Processing

3. License Plate Detection Result

🔌 API Integration

The React frontend communicates with the FastAPI backend using the configured API URL.

React Frontend
      ↓
VITE_API_URL
      ↓
FastAPI Backend
      ↓
/predict
      ↓
YOLO + EasyOCR
      ↓
Detection Result
      ↓
React UI

The backend processes the uploaded image and returns the detected license plate information as JSON.

⚙️ Run Week 8 Locally
1. Clone Repository
git clone https://github.com/asad-iqbal78/ai-internship.git
2. Open Week 8
cd ai-internship/week_8
3. Install Dependencies
npm install
4. Configure API URL

Create a .env file inside the week_8 folder:

VITE_API_URL=https://asadIqbal123-anpr-api.hf.space
5. Start Development Server
npm run dev

The application will be available at the local Vite URL shown in the terminal.

📁 Repository Structure
ai-internship/
│
├── week_1/
│   └── Python and Data Basics
│
├── week_2/
│   └── Data Exploration and Visualization
│
├── week_3/
│   └── Machine Learning
│
├── week_4/
│   └── Model Comparison and Evaluation
│
├── week_5/
│   └── PyTorch Deep Learning
│
├── week_6/
│   └── YOLO and EasyOCR
│
├── week_7/
│   └── FastAPI ANPR API
│
├── week_8/
│   ├── public/
│   ├── src/
│   ├── screenshots/
│   │   ├── home.png
│   │   ├── upload.png
│   │   └── result.png
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md
🎯 Internship Learning Outcomes

During the 8-week internship, I gained practical experience in:

Python programming
NumPy
Pandas
Data cleaning
Exploratory Data Analysis
Data visualization
Machine learning
Model evaluation
Scikit-learn
Neural networks
PyTorch
Computer vision
Object detection
YOLO
OCR
EasyOCR
OpenCV
FastAPI
REST API development
React
API integration
Git and GitHub
Postman
Cloud deployment
Full-stack AI development
🔄 Complete AI Development Pipeline

The internship covered the complete process of taking an AI idea from development to deployment:

Python
   ↓
Data
   ↓
Data Exploration
   ↓
Machine Learning
   ↓
Model Evaluation
   ↓
Deep Learning
   ↓
Computer Vision
   ↓
Object Detection
   ↓
OCR
   ↓
FastAPI
   ↓
React
   ↓
API Integration
   ↓
Deployment
   ↓
Full-Stack AI Application
📌 Internship Objectives Completed

The internship roadmap objectives were:

Learn Python for AI and data work
Work with real datasets
Perform exploratory data analysis
Train machine learning models
Evaluate and compare models
Build a neural network using PyTorch
Implement object detection
Implement OCR
Build an ANPR pipeline
Serve the AI model through an API
Build a React frontend
Integrate frontend with AI backend
Deploy the complete application
Document the work on GitHub
🔮 Future Improvements

Possible future improvements for ANPR Vision include:

Training on larger real-world ANPR datasets
Improving license plate detection accuracy
Better OCR preprocessing
Multiple vehicle detection
Confidence score display
Detection history
Database integration
User authentication
Analytics dashboard
Prediction history
Experiment tracking
Improved UI/UX
📊 Final Project Status
✅ Completed – 8-Week AI Internship

The complete 8-week internship roadmap has been completed.

The final project demonstrates the integration of:

React
  +
FastAPI
  +
YOLO
  +
EasyOCR
  +
OpenCV
  +
PyTorch
  =
Full-Stack ANPR AI Application

The final application is deployed and accessible through the live frontend.

🌍 Deployment
Frontend

Platform: Vercel

https://anpr-vision-ai.vercel.app/

Backend

Platform: Hugging Face Spaces

https://asadIqbal123-anpr-api.hf.space

👨‍💻 Author
Asad Iqbal

BS Software Engineering
PMAS Arid Agriculture University, Rawalpindi

Development Background
Full-Stack Web Development
React
JavaScript
Node.js
Express.js
MongoDB
MySQL
Git & GitHub
AI Skills Developed
Python
NumPy
Pandas
Scikit-learn
PyTorch
YOLO
EasyOCR
OpenCV
FastAPI
🏁 Conclusion

This repository represents my complete 8-week AI internship journey.

The internship started with Python and data fundamentals and progressed through machine learning, deep learning, computer vision, object detection, OCR, API development, and frontend integration.

The final outcome is ANPR Vision, a deployed full-stack AI application that combines a React frontend with a FastAPI backend, YOLO license plate detection, and EasyOCR text recognition.

The project demonstrates how an AI model can be developed, served through an API, integrated into a web application, and deployed for real-world use.
