import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ProfileCard from "./components/profile/ProfileCard";
import Admin from "./components/Admin/Admin";
import Manage from "./components/Admin/Manage";

// Separate component to use useLocation
const AppContent = () => {
  const location = useLocation();
  const [dark, setMode] = useState(JSON.parse(localStorage.getItem("mode")) || false);
  const [showProfile, setShowProfile] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [batch, setBatch] = useState('2026'); 

  useEffect(() => {
    if (location.pathname !== '/admin') {
      localStorage.setItem("mode", JSON.stringify(dark));
    }
  }, [dark, location.pathname]);

  const handleBatchChange = (selectedBatch) => {
    setBatch(selectedBatch);
  };

  if (location.pathname.startsWith('/admin')) {
    return (
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/manage-students" element={<Manage/>} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={dark ? "bg-gray-800 text-white min-h-screen" : "bg-gray-200 text-black min-h-screen"}>
      <Header 
        dark={dark} 
        setMode={setMode} 
        onProfileSelect={(data) => {
          setStudentData(data);
          setShowProfile(true);
        }}
        onBatchChange={handleBatchChange}
         
      />
      <main className="container mx-auto px-4 py-6">
        {showProfile ? (
          <ProfileCard studentData={studentData} onClose={setShowProfile} />
        ) : (
          <Routes>
            <Route path="/" element={<Home batch={batch} />} />
            <Route path="*" element={<div className="text-center py-4">Page not found</div>} />
          </Routes>
        )}
      </main>
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