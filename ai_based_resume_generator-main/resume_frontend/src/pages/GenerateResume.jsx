import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane, FaPlusCircle, FaPrint, FaArrowLeft, FaEdit, FaLightbulb, FaClock, FaHashtag } from "react-icons/fa";
import { BiBook, BiCheckCircle } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { generateResume } from "../api/ResumeService";
import Resume from "../components/Resume";

// =========================================================
// 1. SMART LOADER COMPONENT (Designed for 3-4 min wait)
// =========================================================
const SmartLoader = () => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  // Resume & Interview Tips
  const tips = [
    "💡 Tip: Use action verbs like 'Led', 'Managed', 'Developed'.",
    "🧠 Fact: Recruiters spend only 6-10 seconds scanning a resume initially.",
    "💡 Tip: Quantify results! (e.g., 'Improved efficiency by 20%').",
    "🔒 Privacy: Your data is being processed locally on your own machine.",
    "💡 Tip: Tailor your skills to match the job description keywords.",
    "⏳ Processing: Extracting your key strengths...",
    "💡 Tip: Proofread! Spelling errors are a major red flag.",
    "🚀 AI is structuring your experience section...",
    "💡 Tip: Keep your resume clean and easy to read.",
    "⏳ Almost there! Finalizing formatting..."
  ];

  useEffect(() => {
    // Progress Bar Logic (Set for approx 3.5 minutes = 210 seconds)
    const totalTime = 55 * 1000; 
    const intervalTime = 1000; // Update every second
    const increment = 100 / (totalTime / intervalTime);
    
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        // Stop at 98% so it doesn't show 100% before API finishes
        if (oldProgress >= 98) return 98; 
        return oldProgress + increment;
      });
    }, intervalTime);

    // Tip Changing Logic (Every 4 seconds)
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 max-w-xl mx-auto text-center animate-fade-in">
      {/* Icon & Spinner */}
      <div className="relative mb-6">
        <div className="loading loading-spinner loading-lg text-primary scale-150"></div>
        <FaBrain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary text-xl" />
      </div>
      
      {/* Dynamic Tip Text */}
      <div className="h-20 flex items-center justify-center px-4">
        <p className="text-xl font-medium text-gray-700 transition-all duration-500">
          {tips[tipIndex]}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-base-300 rounded-full h-6 mt-4 overflow-hidden shadow-inner border border-base-content/10">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-6 rounded-full flex items-center justify-center text-xs text-white font-bold transition-all duration-1000 ease-linear" 
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      
      {/* Warning / Info Text */}
      
    </div>
  );
};

// =========================================================
// 2. MAIN COMPONENT
// =========================================================
const GenerateResume = () => {
  const [step, setStep] = useState(1); // 1=Input, 2=Edit, 3=Preview
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  
  const [resumeData, setResumeData] = useState({
    personalInformation: { fullName: "Sayma Chaudhary", email: "", phoneNumber: "", location: "", linkedin: "", gitHub: "", portfolio: "" },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });

  const { register, handleSubmit, control, reset } = useForm({ defaultValues: resumeData, mode: "onChange" });

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description first.");
      return;
    }
    
    try {
      setLoading(true);
      // API call (Takes 3-4 mins locally)
      const responseData = await generateResume(description); 
      console.log(responseData);
      
      const newData = responseData.data || responseData; 
      setResumeData(newData);
      reset(newData);

      toast.success("Resume Loading Successfully!");
      setStep(2); // Move to Edit Form
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    setResumeData(data);
    setStep(3); // Move to Preview
  };

  // Helper functions for UI
  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label"><span className="label-text font-medium">{label}</span></label>
      <input type={type} {...register(name)} className="input input-bordered w-full rounded-lg focus:input-primary" />
    </div>
  );

  const renderSection = (fieldsArray, label, name, keys) => (
    <div className="card bg-base-100 shadow-sm border border-base-200 mb-6 p-4">
      <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
        {label} <span className="badge badge-outline">{fieldsArray.fields.length}</span>
      </h3>
      {fieldsArray.fields.map((field, index) => (
        <div key={field.id} className="collapse collapse-arrow bg-base-200 mb-2 rounded-box">
          <input type="checkbox" /> 
          <div className="collapse-title text-lg font-medium">Item #{index + 1}</div>
          <div className="collapse-content bg-base-100 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keys.map((key) => (<div key={key} className="w-full">{renderInput(`${name}.${index}.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}</div>))}
            </div>
            <button type="button" onClick={() => fieldsArray.remove(index)} className="btn btn-error btn-sm btn-outline mt-4"><FaTrash /> Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => fieldsArray.append(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))} className="btn btn-sm btn-secondary mt-2 w-max"><FaPlusCircle /> Add {label}</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-10 font-sans">
      
      {/* Progress Steps (Stepper) */}
      <div className="flex justify-center mb-8">
        <ul className="steps w-full max-w-3xl">
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>AI Input</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Review & Edit</li>
          <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Final Resume</li>
        </ul>
      </div>

      {/* STEP 1: AI Input OR Loading Screen */}
      {step === 1 && (
        <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
          <div className="card-body text-center">
            
            {!loading ? (
              // SHOW INPUT FORM
              <>
                <h1 className="text-3xl font-bold flex justify-center items-center gap-2 mb-2">
                  <FaBrain className="text-primary" /> Professional AI Resume Builder
                </h1>
                <p className="text-gray-500 mb-6">Enter your details and let our Local AI build your resume.</p>

                <textarea
                  className="textarea textarea-bordered h-48 text-lg"
                  placeholder="E.g., I am a Java Developer with 2 years of experience. I know Spring Boot, React, and MySQL. I did a project on..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className="card-actions justify-center mt-6 gap-4">
                  <button onClick={() => setDescription("")} className="btn btn-ghost"><FaTrash /> Clear</button>
                  <button onClick={handleGenerate} className="btn btn-primary px-8">
                    <FaPaperPlane /> Generate Resume
                  </button>
                </div>
              </>
            ) : (
              // SHOW SMART LOADER (When Loading)
              <SmartLoader />
            )}

          </div>
        </div>
      )}

      {/* STEP 2: Edit Form */}
      {step === 2 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setStep(1)} className="btn btn-ghost gap-2"><FaArrowLeft /> Back</button>
            <h2 className="text-2xl font-bold flex items-center gap-2"><BiBook className="text-accent" /> Edit Your Details</h2>
            <div className="w-24"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput("personalInformation.fullName", "Full Name")}
                {renderInput("personalInformation.email", "Email", "email")}
                {renderInput("personalInformation.phoneNumber", "Phone", "tel")}
                {renderInput("personalInformation.location", "Location")}
                {renderInput("personalInformation.linkedin", "LinkedIn URL", "url")}
                {renderInput("personalInformation.gitHub", "GitHub URL", "url")}
                {renderInput("personalInformation.portfolio", "Portfolio URL", "url")}
              </div>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-primary">Professional Summary</h3>
              <textarea {...register("summary")} className="textarea textarea-bordered w-full h-32" placeholder="Write a professional summary..."></textarea>
            </div>
            {renderSection(skillsFields, "Skills", "skills", ["title", "level"])}
            {renderSection(experienceFields, "Experience", "experience", ["jobTitle", "company", "location", "duration", "responsibility"])}
            {renderSection(educationFields, "Education", "education", ["degree", "university", "location", "graduationYear"])}
            {renderSection(certificationsFields, "Certifications", "certifications", ["title", "issuingOrganization", "year"])}
            {renderSection(projectsFields, "Projects", "projects", ["title", "description", "technologiesUsed", "githubLink"])}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSection(languagesFields, "Languages", "languages", ["name"])}
              {renderSection(interestsFields, "Interests", "interests", ["name"])}
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg mt-8 shadow-lg"><BiCheckCircle className="text-2xl"/> Save & Preview</button>
          </form>
        </div>
      )}

      {/* STEP 3: Preview Resume */}
      {step === 3 && (
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
           <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl shadow-sm">
              <button onClick={() => setStep(2)} className="btn btn-outline gap-2"><FaEdit /> Edit Data</button>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="btn btn-neutral gap-2"><FaPrint /> Print / Save PDF</button>
                <button onClick={() => { setStep(1); setDescription(""); }} className="btn btn-accent gap-2"><FaPlusCircle /> New Resume</button>
              </div>
           </div>
           <div className="border shadow-2xl bg-white text-black p-8 rounded-lg overflow-auto">
              <Resume data={resumeData} />
           </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;