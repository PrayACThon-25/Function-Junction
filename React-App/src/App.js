import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Recommendation from './pages/Recommendation';
import Chatbot from './pages/Chatbot';
import Mentorship from './pages/Mentorship';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/mentorship" element={<Mentorship />} />
      </Routes>
    </Router>
  );
}

export default App;
