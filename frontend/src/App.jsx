import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder components (To be implemented in future parts)
const AIRecommendations = () => <div className="main-content"><h2>AI Recommendations Placeholder</h2></div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* We will add a Navbar here later */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-insights" element={<AIRecommendations />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
