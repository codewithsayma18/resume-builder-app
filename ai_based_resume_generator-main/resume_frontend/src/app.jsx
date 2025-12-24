import { useState } from 'react';
import './App.css'; // Agar CSS file hai toh rehne dein, warna hata dein

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
      // Backend API Call
      const response = await fetch("https://resume-builder-app-d0od.onrender.com/api/v1/resume/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userDescription: description
        })
      });

      if (!response.ok) {
        throw new Error("Server Error: " + response.status);
      }

      const data = await response.json();
      console.log("Data received:", data);
      setResumeData(data.data); // Data set kar rahe hain
    } catch (err) {
      console.error(err);
      setError('Failed to generate resume. Server might be sleeping (wait 30s) or check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>🚀 AI Resume Generator</h1>
      <p>Enter your description (e.g., "I am a Java Developer with experience in Spring Boot"):</p>

      {/* Input Box */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Type here..."
        style={{ width: '100%', height: '100px', padding: '10px', marginBottom: '10px' }}
      />
      <br />
      
      {/* Generate Button */}
      <button 
        onClick={generateResume} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: loading ? '#ccc' : '#28a745', 
          color: 'white', 
          border: 'none', 
          cursor: loading ? 'not-allowed' : 'pointer' 
        }}
      >
        {loading ? 'Creating Resume...' : 'Generate Resume'}
      </button>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Resume Display Area */}
      {resumeData && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px', background: '#f9f9f9' }}>
          <h2>{resumeData.personalInformation.fullName || "Name Not Found"}</h2>
          <p><strong>Email:</strong> {resumeData.personalInformation.email}</p>
          <hr />
          
          <h3>Summary</h3>
          <p>{resumeData.summary}</p>

          <h3>Skills</h3>
          <ul>
            {resumeData.skills && resumeData.skills.map((skill, index) => (
              <li key={index}>{skill.title} ({skill.level})</li>
            ))}
          </ul>

          <h3>Experience</h3>
          <ul>
             {resumeData.experience && resumeData.experience.map((exp, index) => (
               <li key={index}>
                 <strong>{exp.jobTitle}</strong> at {exp.company}
               </li>
             ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;