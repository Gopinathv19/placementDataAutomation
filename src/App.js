import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"  // Fix import
import "./App.css"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"

function App() {
  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode"))
  }
  const [dark, setMode] = useState(getMode())
  
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark))
  }, [dark])
  
  return (
    <BrowserRouter>
      <div className={dark ? "app" : "light"}>
        <Header dark={dark} setMode={setMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App