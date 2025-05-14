// src/components/chat/InputArea.tsx
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // Input area container with a matching dark background and refined top border
    <div className="p-4 border-t border-[#3a4b5c] bg-[#1a2b3c] flex items-center"> 
      {/* Input field with refined styling */}
      <input
        type="text"
        className="flex-1 px-4 py-2 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
        placeholder="Escribe un mensaje..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {/* Send button with a subtle, elegant design and hover effect */}
      <button
        className={`ml-3 p-2 rounded-lg ${input.trim() ? 'bg-[#4A90E2] hover:bg-[#3a7cdb]' : 'bg-gray-600 cursor-not-allowed'} text-white focus:outline-none transition duration-300 ease-in-out`}
        onClick={handleSend}
        disabled={!input.trim()}
      >
        <IoSend size={24} />
      </button>
    </div>
  );
};

export default InputArea;
