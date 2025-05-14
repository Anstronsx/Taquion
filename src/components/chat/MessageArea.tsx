// src/components/chat/MessageArea.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface MessageAreaProps {
  messages: Message[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => {
  return (
    // Flexible container for messages with subtle dark background and padding, ensuring scroll
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm"> 
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Message bubble styling */}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${message.sender === 'user'
                ? 'bg-[#4A90E2] text-white' // A more vibrant blue for user
                : 'bg-gray-200 text-gray-800' // Slightly lighter grey for bot
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageArea;
