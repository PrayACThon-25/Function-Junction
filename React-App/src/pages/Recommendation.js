import React, { useState } from 'react';
import getRecommendations from '../utils/recommendationEngine';
 // Assuming you're putting styles in a separate file

const Recommendation = () => {
  const [skills, setSkills] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleRecommend = () => {
    const inputSkills = skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
    const result = getRecommendations(inputSkills);
    setJobs(result);
  };

  return (
    <div className="recommendation-container">
      <h1 className="recommendation-title">Career Recommendations</h1>
      <p className="recommendation-subtitle">
        Enter your skills to get AI-powered career suggestions.
      </p>

      <div className="recommendation-card">
        <label className="recommendation-label">Your Skills</label>
        <input
          className="recommendation-input"
          type="text"
          placeholder="e.g., Python, UI Design, Communication"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button className="recommendation-button" onClick={handleRecommend}>
          Get Recommendations
        </button>

        {jobs.length > 0 && (
          <div className="recommendation-results">
            <h2>Recommended Careers:</h2>
            <ul>
              {jobs.map((job, index) => (
                <li key={index}>🧑‍💼 {job}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
