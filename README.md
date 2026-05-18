# ⚡ EmpAI: AI-Driven Employee Performance Analytics

An advanced, full-stack employee performance monitoring and analytics dashboard built using the **MERN (MongoDB, Express, React, Node.js) Stack** and integrated with the **arcee-ai/trinity-large-thinking:free** LLM via the OpenRouter API.

Developed as a highly polished, performance management portal for HR and Admin managers to easily evaluate teams, review skill distributions, and generate data-backed promotional and training strategies.

---

## 🚀 Key Features

*   **🔒 Complete Authentication System**: Secure sign-up and login interface with JWT-based sessions and bcrypt-encrypted credentials stored in Cloud MongoDB.
*   **📊 Interactive Glassmorphism Dashboard**: Fully responsive panel featuring aggregate metrics (Total Employees, Average Score) and dynamic state-driven layouts.
*   **📁 Advanced Employee CRUD Operations**: Live registration, real-time query list rendering, inline score editing, and smooth database profile deletions.
*   **🔍 Search & Dynamic Filters**: Fast query capability letting HR/Admins search employees by name or filter instantly by department.
*   **🧠 AI-Driven Recommendation Engine**: Connects seamlessly with the **Trinity LLM** to analyze profile details and output structured verdicts:
    *   *Promotion Verdict*: Highly styled "Recommended" or "Not Ready" badges.
    *   *HR Feedback*: Structured sentence reviewing their core potential.
    *   *Targeted Training Suggestions*: Interactive badges indicating skills to acquire.

---

## 🛠️ Technology Stack

*   **Frontend**: React.js (Vite), Axios, React Router, HSL CSS Custom Tokens, CSS Animations.
*   **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose ODM).
*   **AI Integration**: OpenRouter API (`arcee-ai/trinity-large-thinking:free`).
*   **Deployment**: 
    *   Backend Web Service: Render Cloud.
    *   Frontend Static Site: Render CDN (configured with router rewrites).

---

## 🌐 Live Deployed Application

*   **Frontend Live UI**: [https://ai-employee-performance-analytics-ui.onrender.com](https://ai-employee-performance-analytics-ui.onrender.com)
*   **Backend Live API**: [https://ai-employee-performance-analytics.onrender.com](https://ai-employee-performance-analytics.onrender.com)

---

## 📁 Repository Directory Structure

```text
AI-Employee-Performance-Analytics/
├── backend/
│   ├── config/             # DB Connection Config
│   ├── controllers/        # CRUD & Auth Route Controllers
│   ├── middleware/         # Token Guard & Error Middleware
│   ├── models/             # User & Employee Mongoose Schemas
│   ├── routes/             # RESTful Routes Definitions
│   ├── services/           # OpenRouter AI Trinity Service
│   ├── .env.example        # Environment Variables Template
│   ├── package.json
│   └── server.js           # Express App Entry Point
└── frontend/
    ├── src/
    │   ├── components/     # UI Parts (Navbar, Search, Forms, Lists)
    │   ├── pages/          # Full Route Views (Login, Signup, Dashboard, AI)
    │   ├── utils/          # Axios Global Headers Config
    │   ├── App.jsx         # Routing Rules & protected Gates
    │   ├── index.css       # Deep-Gray & Neon Yellow Custom Design Tokens
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Local Installation & Setup

Follow these simple steps to run the complete MERN application locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/yash-Bansal10/AI-Employee-Performance-Analytics.git
cd AI-Employee-Performance-Analytics
```

### **2. Setup Backend Server**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root directory and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
4. Start the server locally:
   ```bash
   npm run dev
   ```

### **3. Setup Frontend Client**
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.
