// src/pages/Root.jsx
import React from "react";
// 👇 यहाँ सिर्फ एक बार Outlet import करें
import { Outlet } from "react-router-dom"; 
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>
        {/* 👇 यहाँ आपके पेज (Home, About) दिखाई देंगे */}
        <Outlet />
      </div>
    </div>
  );
}

export default Root;