import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import PasswordModal from './components/PasswordModal';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState('gpt-4'); // or 'claude'

  const handleSendMessage = async (message) => {
    const newMessage = {
      content: message,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await fetch('https://bqbrtdlehfnqz24yorrxbeqw6a0elxnr.lambda-url.us-west-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          model
        }),
      });

      const data = await response.json();
      console.log('Response:', data);
      
      setMessages(prev => [...prev, {
        content: data.message,
        role: 'assistant',
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: 'Sorry, there was an error processing your request.',
        role: 'system',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      {!isAuthenticated ? (
        <PasswordModal onAuthenticate={setIsAuthenticated} />
      ) : (
        <div className="container mx-auto p-4 max-w-4xl">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">AI Chat Interface</h1>
            <select 
              className="bg-[#1a1d24] border border-gray-700 rounded px-3 py-1"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="claude">Claude</option>
            </select>
          </header>
          <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default App;