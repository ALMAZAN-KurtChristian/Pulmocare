import React, { useState, useRef } from 'react';
import './ChatBot.scss';


const API_ENDPOINT = 'https://api.openai.com/v1/completions'; // Example API endpoint for GPT-3

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I'm PulmoCare! How may I help you today?", sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);

  const handleUserInput = async () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { text: userInput, sender: 'users' }];
    setMessages(newMessages);
    setUserInput('');

    try {
      // Send request to API for chat completion
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 50, // Maximum number of tokens for completion
          temperature: 0.7, // Sampling temperature for randomness in completion
          stop: ['\n', 'User:', 'Bot:'] // Stop tokens to end the completion
        })
      });

      const data = await response.json();

      // Update messages state with completion response
      setMessages([...newMessages, { text: data.choices[0].text.trim(), sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="chat-bot">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUserInput();
            }
          }}
          ref={inputRef}
        />
        <button onClick={handleUserInput}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
