const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const { Groq } = require('groq-sdk'); // Ensure you installed this with npm install groq-sdk

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload()); // Middleware to handle file uploads

// Initialize Groq with API key from .env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Test route
app.get('/', (req, res) => {
  res.send('AI Resume Analyzer and Chatbot using Groq is running!');
});

// Resume Analysis Route
app.post('/api/analyze-resume', async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).send('No resume file uploaded.');
  }

  const resumeFile = req.files.resume;

  // Read the file content
  const resumeText = resumeFile.data.toString('utf-8');

  // Define a prompt for resume analysis
  const prompt = `
    You are an AI resume analyzer. Given the resume content below, provide detailed feedback on:
    1. Missing skills or certifications.
    2. Sections that need improvement (e.g., Education, Experience, Projects).
    3. Suggestions to improve the formatting or structure.
    
    Resume Content:
    ${resumeText}
  `;

  try {
    // Send prompt to Groq API for analysis
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are a professional resume analyzer.' },
        { role: 'user', content: prompt },
      ],
    });

    const feedback = completion.choices[0]?.message?.content || 'No feedback generated';
    res.json({ feedback });
  } catch (error) {
    console.error('Groq Resume Analysis Error:', error);
    res.status(500).json({ error: 'Error analyzing resume using Groq AI' });
  }
});

// Chatbot Route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0]?.message?.content || 'No response from AI';
    console.log('Groq response:', reply);
    res.json({ reply });

  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Error fetching response from Groq AI' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Groq AI backend running on http://localhost:${PORT}`);
});