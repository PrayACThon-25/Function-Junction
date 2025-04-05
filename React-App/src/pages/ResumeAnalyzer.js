import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import '../index.css';

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert('Please upload a resume first.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('resume', resumeFile);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze-resume', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const feedback = response.data.feedback.replace(/\*\*/g, '');
      setResult(feedback);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFillColor(230, 247, 255);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFontSize(20);
    doc.setTextColor(40, 91, 140);
    doc.text('Smart Resume', 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${formData.name}`, 14, 35);
    doc.text(`Email: ${formData.email}`, 14, 43);
    doc.text(`Experience: ${formData.experience}`, 14, 51);

    doc.text('Skills:', 14, 61);
    const skillsArray = formData.skills.split(',');
    skillsArray.forEach((skill, index) => {
      doc.text(`- ${skill.trim()}`, 20, 68 + index * 8);
    });

    const cleanName = formData.name.trim().replace(/\s+/g, '_') || 'resume';
    const fileName = `${cleanName}_resume.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="resume-analyzer-container">
      <h2 className="section-title">Smart Resume Analyzer</h2>

      <div className="upload-section">
        <h3 className="sub-title">Upload and Analyze Resume</h3>
        <div className="custom-file-upload">
          <label htmlFor="resumeUpload" className="upload-label">
            📁 Choose File
          </label>
          <input
            id="resumeUpload"
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
          />
        </div>
        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze
        </button>
      </div>

      {result && (
        <div className="feedback-section">
          <p className="feedback-title">AI Feedback:</p>
          <pre className="feedback-box">{result}</pre>
        </div>
      )}

      <div className="generate-section">
        <h3 className="sub-title">Generate Resume as PDF</h3>
        <div className="input-grid">
          <input
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            name="experience"
            placeholder="Experience"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <button onClick={generatePdf} className="generate-btn">
          Generate PDF Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
