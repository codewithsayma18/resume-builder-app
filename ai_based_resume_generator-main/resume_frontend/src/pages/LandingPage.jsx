import React from "react";
// ❌ Maine yahan se Router aur Link wala import HATA DIYA hai.
// Sirf Image import rakha hai.

import hamidPic from "../assets/HAMIDALI.jpg";
import samiyaPic from "../assets/image.png";



const LandingPage = () => {
  return (
    <div className="bg-base-100">
      
      {/* Hero Section */}
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">
              Create Your Perfect Resume with AI
            </h1>
            <p className="py-6 text-lg">
              Build a professional resume in minutes. Just describe yourself,
              and our AI will do the rest!
            </p>
            {/* ✅ Simple Anchor Tag use kiya hai */}
            <a href="/generate-resume" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="card-title">AI-Powered</h3>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="card-title">Templates</h3>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="card-title">Job-Specific</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p>"Saved me so much time!"</p>
                <div className="flex items-center mt-4">
                  <div className="ml-4">
                    <h4 className="font-bold">Rahul Johri</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p>"Highly recommend this tool."</p>
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {/* ✅ Image Variable Use */}
                      <img src={hamidPic} alt="Hamid Ali" className="object-cover" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Hamid Ali</h4>
                    <p>Marketing Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <p>AI Resume Maker<br/>Providing reliable tech since 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;