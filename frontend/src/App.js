import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import ProfileCard from "./components/profile/ProfileCard"

function App() {
  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode")) || true
  }
  const [dark, setMode] = useState(getMode())
  const [showProfile, setShowProfile] = useState(false)
  const [studentData, setStudentData] = useState(null)
  
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark))
  }, [dark])
  
  const handleProfileSelect = (data) => {
    setStudentData(data)
    setShowProfile(true)
  }
  
  return (
    <BrowserRouter>
      <div className={dark ? "app" : "light"}>
        <Header 
          dark={dark} 
          setMode={setMode} 
          onProfileSelect={handleProfileSelect}
        />
        {showProfile ? (
          <ProfileCard 
            studentData={studentData} 
            onClose={() => setShowProfile(false)}
          />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App