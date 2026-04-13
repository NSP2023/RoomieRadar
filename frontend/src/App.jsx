// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import AuthCallback from './pages/Auth/AuthCallback'; 

// Components
import Navbar from './components/Navbar';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Questionnaire from './pages/Questionnaire/Questionnaire';
import RoommateMatch from './pages/RoommateMatch/RoommateMatch';
import DaySimulation from './pages/RoommateMatch/DaySimulation';
import CompareView from './pages/RoommateMatch/CompareView';
import Profile from './pages/Profile/Profile';
import HowItWorks from './components/Home/HowItWorks';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading your RoomieRadar... 🏠✨</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected routes — require login */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/questionnaire"
              element={
                <ProtectedRoute>
                  <Questionnaire />
                </ProtectedRoute>
              }
            />

            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <RoommateMatch />
                </ProtectedRoute>
              }
            />

            <Route
              path="/simulation/:id"
              element={
                <ProtectedRoute>
                  <DaySimulation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/compare/:id"
              element={
                <ProtectedRoute>
                  <CompareView />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;