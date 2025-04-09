import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { text: userInput, sender: "user" };
    setMessages([...messages, newMessage]);

    // Send user message to OpenAI and get response
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();
    const botMessage = { text: data.message, sender: "bot" };
    setMessages([...messages, newMessage, botMessage]);
    setUserInput("");
  };

  return (
    <div className="App">
      <h1>WanderBae: Your Flirty Travel Buddy</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your travel question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
