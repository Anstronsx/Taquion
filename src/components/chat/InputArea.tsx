// src/components/chat/InputArea.tsx
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5'; // Assuming react-icons is installed and we can use IoSend

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
    if (e.key === 'Enter' && !e.shiftKey) { // Allow Shift + Enter for new line if needed later
      e.preventDefault(); // Prevent default form submission
      handleSend();
    }
  };

  return (
    // Clean container with subtle top border
    <div className="p-3 border-t border-gray-200 bg-white flex items-center"> 
      {/* Input field with rounded ends */}
      <input
        type="text"
        className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-0 placeholder-gray-500"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {/* Send button (icon style) */}
      <button
        className={`ml-2 p-2 rounded-full ${input.trim() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} focus:outline-none transition duration-300`}
        onClick={handleSend}
        disabled={!input.trim()}
      >
        <IoSend size={24} /> {/* Send icon */}
      </button>
    </div>
  );
};

export default InputArea;
