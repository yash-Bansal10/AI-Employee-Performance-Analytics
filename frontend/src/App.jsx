import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Placeholder components (To be implemented in future parts)
const Login = () => <div className="main-content"><h2>Login Page Placeholder</h2></div>;
const Signup = () => <div className="main-content"><h2>Signup Page Placeholder</h2></div>;
const Dashboard = () => <div className="main-content"><h2>Dashboard Page Placeholder</h2></div>;
const AIRecommendations = () => <div className="main-content"><h2>AI Recommendations Placeholder</h2></div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* We will add a Navbar here later */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-insights" element={<AIRecommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
