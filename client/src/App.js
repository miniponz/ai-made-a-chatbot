// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { user: 'User', text: message };
    setChat([...chat, newMessage]);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/chat`, { message });
      const teacherReply = { user: 'Mr. Mateski', text: response.data.reply };
      setChat([...chat, newMessage, teacherReply]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }

    setMessage('');
  };

  return (
    <div className="App">
      <h1>Mr. Mateski Chatbot</h1>
      <div className="chatbox">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.user.toLowerCase()}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
