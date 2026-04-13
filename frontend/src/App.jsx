import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PlanTrip from './pages/PlanTrip';
import Result from './pages/Result';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setTripData(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <main className="container mx-auto px-4 py-8 relative z-10 w-full max-w-7xl">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/plan-trip" /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/plan-trip" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/plan-trip" />} />
            
            <Route path="/plan-trip" element={isAuthenticated ? <PlanTrip setTripData={setTripData} /> : <Navigate to="/login" />} />
            <Route path="/result" element={isAuthenticated ? <Result tripData={tripData} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
