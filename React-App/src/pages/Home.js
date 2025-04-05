import React, { useState } from 'react';
import '../index.css'; // If you’ve saved the CSS in a separate file, otherwise ignore this line

const Home = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendedRole, setRecommendedRole] = useState('');

  const handleChange = (e, question) => {
    setAnswers({ ...answers, [question]: e.target.value });
  };

  const determineRole = () => {
    const roles = {
      Developer: 0,
      Designer: 0,
      DataScientist: 0,
      Manager: 0,
      Entrepreneur: 0
    };

    Object.values(answers).forEach(answer => {
      switch (answer) {
        case 'Math & Logic':
        case 'Technology & Coding':
        case 'Problem-solving':
        case 'Analytical':
          roles.Developer++;
          roles.DataScientist++;
          break;
        case 'Art & Design':
        case 'Creativity':
        case 'Creating content':
        case 'Creative':
          roles.Designer++;
          break;
        case 'Leadership':
        case 'Management role':
        case 'Office':
          roles.Manager++;
          break;
        case 'Entrepreneurship':
        case 'Building businesses':
          roles.Entrepreneur++;
          break;
        default:
          break;
      }
    });

    const bestRole = Object.entries(roles).sort((a, b) => b[1] - a[1])[0][0];
    return bestRole;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const role = determineRole();
    setRecommendedRole(role);
  };

  const questions = [
    {
      question: 'What subjects or tasks do you enjoy the most?',
      options: ['Math & Logic', 'Art & Design', 'Writing & Communication', 'Technology & Coding']
    },
    {
      question: 'What are your strongest skills or talents?',
      options: ['Problem-solving', 'Creativity', 'Leadership', 'Collaboration']
    },
    {
      question: 'What kind of work environment do you thrive in?',
      options: ['Remote', 'Office', 'Field Work', 'Flexible']
    },
    {
      question: 'What kind of impact do you want to make through your career?',
      options: ['Innovation', 'Helping others', 'Building businesses', 'Creating content']
    },
    {
      question: 'Do you prefer working with people, data, or technology?',
      options: ['People', 'Data', 'Technology', 'All of the above']
    },
    {
      question: 'Are you more creative or analytical in your thinking?',
      options: ['Creative', 'Analytical', 'Balanced']
    },
    {
      question: 'What are your long-term career goals?',
      options: ['Entrepreneurship', 'Specialist in a field', 'Management role', 'Flexible freelance work']
    }
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Career AI</h1>
      <p className="home-subtitle">Your personalized AI-powered career guide</p>

      <div className="quiz-card">
        <h2 className="quiz-title">Career Reflection Quiz</h2>

        <form onSubmit={handleSubmit}>
          {questions.map((q, idx) => (
            <div key={idx}>
              <p className="quiz-question">{idx + 1}. {q.question}</p>
              {q.options.map((option, i) => (
                <label key={i} className="quiz-option">
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={option}
                    checked={answers[q.question] === option}
                    onChange={(e) => handleChange(e, q.question)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" className="quiz-button">Submit</button>
        </form>

        {submitted && (
          <div className="result-box">
            <p className="result-title">Recommended Career Role:</p>
            <p className="result-role">{recommendedRole}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
