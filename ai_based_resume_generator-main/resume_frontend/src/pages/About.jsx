import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaLightbulb, FaRocket } from "react-icons/fa"; 

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* Hero Section */}
      <div className="text-center py-16 px-6 bg-gray-50 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          About <span className="text-blue-600">Professional AI Resume Builder</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We are on a mission to simplify the job application process. 
          Our AI-powered tool helps students and professionals build ATS-friendly, 
          professional resumes in minutes, not hours.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="card bg-white border border-gray-100 shadow-xl p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4 text-3xl">
              <FaRocket />
            </div>
            <h3 className="text-xl font-bold mb-3">Fast & Easy</h3>
            <p className="text-gray-500">
              No complex formatting. Just enter your details, and our AI formats everything perfectly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-white border border-gray-100 shadow-xl p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-purple-100 text-purple-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4 text-3xl">
              <FaLightbulb />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Suggestions</h3>
            <p className="text-gray-500">
              Get AI-driven tips on what skills to add and how to describe your experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-white border border-gray-100 shadow-xl p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4 text-3xl">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold mb-3">For Everyone</h3>
            <p className="text-gray-500">
              Whether you are a fresher or an experienced professional, we have templates for you.
            </p>
          </div>

        </div>
      </div>

      {/* Story Section */}
      <div className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why We Started?</h2>
          <p className="text-lg opacity-90 leading-loose mb-8">
            Job hunting is stressful. We realized that many talented candidates get rejected simply because their resume wasn't formatted correctly for ATS (Applicant Tracking Systems). 
            <br/><br/>
            Gen G Resume was born to fix this. We combine **design** with **technology** to give you the best chance of getting hired.
          </p>
          <Link to="/contact" className="btn bg-white text-blue-700 hover:bg-gray-100 border-none rounded-full px-8 font-bold">
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;