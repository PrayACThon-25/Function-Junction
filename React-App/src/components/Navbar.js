import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="p-4 bg-blue-600 text-white flex justify-around">
    <Link to="/">Home</Link>
    <Link to="/resume">Resume Analyzer</Link>
    <Link to="/recommendation">Career Recommendations</Link>
    <Link to="/chatbot">Chatbot</Link>
    <Link to="/mentorship">Mentorship</Link>
  </nav>
);
export default Navbar;