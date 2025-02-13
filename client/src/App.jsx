import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Home from "./Home";
import { auth } from "./firebase";
import Discuss from "./Discuss";
import Dashboard from "./components/Dashboard/Dashboard";
import Quiz from "./components/Quiz/Quiz";
import Navigation from "./components/Navigation/Navigation";
import Problems from "./components/Problems/Problems";
import { initializeDatabase } from "./utils/initializeDB";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      // Initialize database when user logs in
      if (user) {
        initializeDatabase().catch(error => {
          console.error('Failed to initialize database:', error);
          toast.error('Failed to load questions. Please try refreshing the page.');
        });
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Navigation user={user} />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/home" /> : <LoginForm />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/home" /> : <RegisterForm />} 
            />
            <Route 
              path="/home" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/quiz" 
              element={user ? <Quiz /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/problems" 
              element={user ? <Problems /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/discuss" 
              element={user ? <Discuss /> : <Navigate to="/login" />} 
            />
            {/* Catch all route for 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </>
  );
}

export default App;
