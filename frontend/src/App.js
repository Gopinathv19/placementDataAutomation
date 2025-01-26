import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ProfileCard from "./components/profile/ProfileCard";
import Admin from "./components/Admin/Admin";

// Separate component to use useLocation
const AppContent = () => {
  const location = useLocation();
  const [dark, setMode] = useState(JSON.parse(localStorage.getItem("mode")) || true);
  const [showProfile, setShowProfile] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (location.pathname !== '/admin') {
      localStorage.setItem("mode", JSON.stringify(dark));
    }
  }, [dark, location.pathname]);

  if (location.pathname === '/admin') {
    return (
      <div className="admin-root">
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={dark ? "app" : "light"}>
      <Header 
        dark={dark} 
        setMode={setMode} 
        onProfileSelect={(data) => {
          setStudentData(data);
          setShowProfile(true);
        }} 
      />
      {showProfile ? (
        <ProfileCard studentData={studentData} onClose={() => setShowProfile(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      )}
      <Footer />
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;