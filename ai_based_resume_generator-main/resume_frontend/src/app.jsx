import { useState } from 'react';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateResume = async () => {
    if (!description) {
      alert('Please enter some text first!');
      return;
    }

    setLoading(true);
    setError('');
    setResumeData(null);

    try {
      const response = await fetch("https://resume-builder-app-d0od.onrender.com/api/v1/resume/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userDescription: description })
      });

      if (!response.ok) throw new Error("Server Error: " + response.status);
      const data = await response.json();
      setResumeData(data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🚀 AI Resume Generator</h1>
      <p>Enter your details and let AI design your professional resume.</p>

      {/* Input Section */}
      <textarea
        className="input-box"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="E.g., I am a Full Stack Developer with 3 years experience in React and Node.js..."
      />
      
      <button className="generate-btn" onClick={generateResume} disabled={loading}>
        {loading ? '✨ Creating Resume...' : 'Generate Resume'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* ---- RESUME DISPLAY SECTION ---- */}
      {resumeData && (
        <div className="resume-paper">
          
          {/* Header */}
          <div className="resume-header">
            <h1>{resumeData.personalInformation.fullName || "Your Name"}</h1>
            <div className="contact-info">
              <span>{resumeData.personalInformation.email}</span> | 
              <span>{resumeData.personalInformation.phoneNumber}</span> |
              <span>{resumeData.personalInformation.location}</span>
            </div>
            <div className="contact-info">
              {resumeData.personalInformation.linkedIn && <a href={resumeData.personalInformation.linkedIn} target="_blank" className="link">LinkedIn</a>}
              {resumeData.personalInformation.gitHub && <span> | <a href={resumeData.personalInformation.gitHub} target="_blank" className="link">GitHub</a></span>}
            </div>
          </div>

          {/* Summary */}
          <div className="section">
            <div className="section-title">Professional Summary</div>
            <p className="summary-text">{resumeData.summary}</p>
          </div>

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="section">
              <div className="section-title">Work Experience</div>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="job-header">
                    <span>{exp.jobTitle}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <div className="job-company">{exp.company} - {exp.location}</div>
                  <p>{exp.responsibility}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="section">
              <div className="section-title">Projects</div>
              {resumeData.projects.map((proj, index) => (
                <div key={index} className="project-item">
                  <div className="job-header">
                    <span>{proj.title}</span>
                  </div>
                  <p>{proj.description}</p>
                  <small><strong>Tech Stack:</strong> {proj.technologiesUsed ? proj.technologiesUsed.join(', ') : ''}</small>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="section">
              <div className="section-title">Technical Skills</div>
              <div className="skills-grid">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.title} ({skill.level})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="section">
              <div className="section-title">Education</div>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="job-header">
                    <span>{edu.degree}</span>
                    <span>{edu.graduationYear}</span>
                  </div>
                  <div>{edu.university}, {edu.location}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;