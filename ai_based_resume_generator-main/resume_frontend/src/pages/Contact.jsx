import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  
  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault(); 
    toast.success("Message sent successfully! We will contact you soon. 🚀");
    e.target.reset(); 
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* Header Section */}
      <div className="bg-gray-50 py-12 px-6 text-center border-b border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Get in <span className="text-blue-600">Touch</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about our Gen Z Resume Builder? Need help with your career? 
          Fill out the form below, and our team will get back to you within 24 hours.
        </p>
      </div>

      {/* Main Content: Split Layout (Info + Form) */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 rounded-2xl overflow-hidden">
          
          {/* LEFT SIDE: Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
            <p className="text-gray-500 mb-6">We are here to help you. Reach out to us via any of the following methods.</p>
            
            <div className="flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full text-xl shadow-sm">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Email Us</h3>
                <p className="text-gray-600">saymagzb007@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full text-xl shadow-sm">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Call Us</h3>
                <p className="text-gray-600">9760294050</p>
                <p className="text-xs text-gray-500">Mon - Fri (9 AM - 6 PM)</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-red-100 text-red-600 p-4 rounded-full text-xl shadow-sm">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Visit Us</h3>
                <p className="text-gray-600">
                  Gen Z Tech Hub, <br/>
                  Ghaziabad U.P. India - 201002
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 pl-4">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all"><FaLinkedin size={20} /></a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-900 hover:bg-black hover:text-white hover:shadow-lg transition-all"><FaGithub size={20} /></a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-blue-400 hover:bg-blue-400 hover:text-white hover:shadow-lg transition-all"><FaTwitter size={20} /></a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Contact Form (Professional & Clean) */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="form-control">
                <label className="label text-gray-600 font-medium ml-1">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Ex: John Doe" 
                  className="input w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none placeholder-gray-400" 
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label text-gray-600 font-medium ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Ex: hello@example.com" 
                  className="input w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none placeholder-gray-400" 
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label text-gray-600 font-medium ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Ex: Inquiry about services..." 
                  className="input w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none placeholder-gray-400" 
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label text-gray- font-medium ml-1">Message</label>
                <textarea 
                  className="textarea h-32 w-full bg-white border border-white text-white-900 rounded-xl focusbg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none placeholder-gray-1000 resize-none text-base p-4" 
                  placeholder="Type your message here..." 
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-lg w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl border-none mt-4 transition-transform hover:-translate-y-1">
                <FaPaperPlane className="mr-2" /> Send Message
              </button>

            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;