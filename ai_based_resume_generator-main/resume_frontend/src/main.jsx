import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages Imports
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
// 👇 Import Services Page Here
import Services from "./pages/Services"; 
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Parent Layout */}
        <Route path="/" element={<Root />}>
          
          {/* Landing Page */}
          <Route index element={<Home />} />
          
          {/* Other Pages */}
          <Route path="about" element={<About />} />
          
          {/* 👇 Ye Route Add karna zaroori hai tabhi page dikhega */}
          <Route path="services" element={<Services />} /> 
          
          <Route path="contact" element={<Contact />} />
          <Route path="generate-resume" element={<GenerateResume />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);