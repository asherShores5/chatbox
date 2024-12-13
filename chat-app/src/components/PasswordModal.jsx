// components/PasswordModal.jsx
import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const PasswordModal = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, use a secure password hash comparison
    if (password === 'peterbear') {
      onAuthenticate(true);
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f1115] flex items-center justify-center p-4">
      <div className="bg-[#1a1d24] p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-center mb-6">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2a2d34] border border-gray-700 rounded px-4 py-2 mb-4"
            placeholder="Password"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;