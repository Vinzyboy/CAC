# Installation Guide

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [Python](https://www.python.org/downloads/) (Recommended: 3.12+)
- [Git](https://git-scm.com/)

---

## 1. Clone the Repository and Open Command Prompt

1. Clone the repository:

   ```bash
   git clone https://github.com/Vinzyboy/CAC.git
   ```

2. Navigate to the `CAC` directory and open a **Command Prompt** from there:
   - On Windows: Open the `CAC` folder in File Explorer, then **Shift + Right-click** and select **"Open Command Prompt here"** (or PowerShell/Terminal).
---

## 2. Install Dependencies

1. Install frontend dependencies:

   ```bash
   npm install
   ```

2. Create and activate a virtual environment for the backend:

   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   python.exe -m pip install --upgrade pip
   ```

3. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

---

## 3. Running the Project

1. Start the Flask backend server:

   ```bash
   python src/components/pages/backend/server.py
   ```

   The backend should now be running at [http://localhost:5001](http://localhost:5001).
   
2. In a new Command Prompt, start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running at [http://localhost:3000](http://localhost:3000).
   
---

## 4. Connecting Frontend and Backend

- Ensure both the frontend and backend are running.

