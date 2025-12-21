import React from "react";
import { FaRobot, FaLaptopCode, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";

const Services = () => {
  const servicesList = [
    {
      id: 1,
      icon: <FaRobot className="text-5xl text-blue-600" />,
      title: "AI Resume Builder",
      description: "Generate ATS-friendly resumes instantly with our advanced AI. Just enter your details, and let magic happen.",
    },
    {
      id: 2,
      icon: <FaLaptopCode className="text-5xl text-purple-600" />,
      title: "Portfolio Creation",
      description: "Showcase your work professionally. We help you build stunning digital portfolios that impress recruiters.",
    },
    {
      id: 3,
      icon: <FaUserTie className="text-5xl text-green-600" />,
      title: "Career Coaching",
      description: "Get expert guidance on job hunting, interview preparation, and salary negotiation strategies.",
    },
    {
      id: 4,
      icon: <BiWorld className="text-5xl text-orange-500" />,
      title: "Global Job Search",
      description: "Access a curated list of remote and international job openings tailored to your skill set.",
    },
    {
      id: 5,
      icon: <MdOutlineSupportAgent className="text-5xl text-red-500" />,
      title: "24/7 Priority Support",
      description: "Stuck somewhere? Our dedicated support team is always available to resolve your queries instantly.",
    },
    {
      id: 6,
      icon: <FaCheckCircle className="text-5xl text-teal-500" />,
      title: "Resume Review",
      description: "Already have a resume? Get it reviewed by experts and improve your chances of getting hired.",
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* Header Section */}
      <div className="bg-gray-50 py-16 px-6 text-center border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Our <span className="text-blue-600">Premium Services</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Elevate your career with our AI-powered tools and expert guidance. We provide everything you need to land your dream job.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="card bg-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl p-8"
            >
              <div className="mb-6 flex justify-center bg-gray-50 w-20 h-20 mx-auto items-center rounded-full">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-center leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your career?</h2>
        <p className="mb-8 text-blue-100 text-lg">Join thousands of professionals who trusted Gen G Resume.</p>
        <Link to="/generate-resume" className="btn btn-lg bg-white text-blue-700 hover:bg-gray-100 border-none rounded-full px-10 shadow-lg">
          Start Building Now
        </Link>
      </div>

    </div>
  );
};

export default Services;