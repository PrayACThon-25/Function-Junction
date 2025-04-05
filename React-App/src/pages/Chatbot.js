import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = {
        text: data.reply || 'No response from AI.',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: '⚠️ Error fetching response from AI.', sender: 'bot' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">AI Career Chatbot</h2>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-message ${msg.sender}`}>
            <p className="chatbot-bubble">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="typing">Typing...</p>}
      </div>

      <div className="chatbot-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a career-related question..."
          className="chatbot-input"
        />
        <button onClick={sendMessage} className="chatbot-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
