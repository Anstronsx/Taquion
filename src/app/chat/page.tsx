// src/app/chat/page.tsx
'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import MessageArea from '@/components/chat/MessageArea';
import InputArea from '@/components/chat/InputArea';
import DataPanel from '@/components/DataPanel'; // Import DataPanel
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import Link from 'next/link'; // Import Link

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// Define interfaces for the data the DataPanel expects
interface AgriculturalPrice {
  name: string;
  price: string;
  change: number;
}

interface CryptoPrice {
  name: string;
  price: string;
  change: number;
}

export default function ChatPage() { // Renamed component to ChatPage
  const [messages, setMessages] = useState<Message[]>([]);
  // State for real-time data
  const [agriculturalData, setAgriculturalData] = useState<AgriculturalPrice[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoPrice[]>([]);
  // State for unique session ID
  const [sessionId, setSessionId] = useState<string>('');

  const webhookUrl = 'https://x8x.omictechglobal.com/webhook/inpu'; // Production webhook URL

  // Generate session ID on component mount and simulate real-time data
  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);

    // --- Simulated Real-time Data Logic ---
    // Initial dummy data (will be updated by the interval)
    const initialAgriculturalData: AgriculturalPrice[] = [
      { name: 'Maiz', price: '$2.50/kg', change: 1.2 },
      { name: 'Arroz', price: '$1.80/kg', change: -0.5 },
      { name: 'Sandia', price: '$0.90/kg', change: 3.1 },
    ];

    const initialCryptoData: CryptoPrice[] = [
      { name: 'Bitcoin', price: '$30,000', change: 2.5 },
      { name: 'Ethereum', price: '$2,000', change: 0.8 },
      { name: 'Dogecoin', price: '$0.08', change: -1.1 },
    ];

    // Set initial data
    setAgriculturalData(initialAgriculturalData);
    setCryptoData(initialCryptoData);

    // Function to simulate price updates
    const simulatePriceUpdate = () => {
      setAgriculturalData(currentData =>
        currentData.map(item => {
          const currentPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Basic price parsing
          const randomChange = (Math.random() - 0.5) * 0.1; // Simulate small random change (up to +/- 5% of current change)
          const newChange = parseFloat((item.change + randomChange).toFixed(1)); // Update change percentage
          // Simulate price change based on the change percentage (simple approach)
          const newPriceValue = currentPrice * (1 + newChange / 100);
          // Format price back to string (basic formatting)
          const newPrice = `$${newPriceValue.toFixed(item.price.includes('.') ? 2 : 0)}${item.price.includes('/') ? '/kg' : ''}`; // Keep original unit/format simple

          return { ...item, price: newPrice, change: newChange };
        })
      );

      setCryptoData(currentData =>
        currentData.map(item => {
           const currentPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Basic price parsing
           const randomChange = (Math.random() - 0.5) * 0.2; // Simulate slightly larger random change for crypto
           const newChange = parseFloat((item.change + randomChange).toFixed(1)); // Update change percentage
            // Simulate price change based on the change percentage (simple approach)
           const newPriceValue = currentPrice * (1 + newChange / 100);
           // Format price back to string (basic formatting)
           const newPrice = `$${newPriceValue.toFixed(item.price.includes('.') ? 2 : 0)}`; // Keep original unit/format simple

          return { ...item, price: newPrice, change: newChange };
        })
      );
    };

    // Implement interval for simulated real-time updates
    const intervalId = setInterval(simulatePriceUpdate, 3000); // Update every 3 seconds (adjust as needed)

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);

  }, []); // Empty dependency array means this effect runs once on mount
  // ------------------------------------------------------------

  const handleSendMessage = async (messageText: string) => {
    // Add user message to state
    const newUserMessage: Message = { sender: 'user', text: messageText };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      // Send message to N8N webhook including the session ID
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText, sessionId: sessionId }), // Include sessionId here
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Webhook response data:', data); // Log the response data

      // Use 'data.output' to get the bot's message based on the console output
      const botReplyText = data.output || 'Error: Could not get a reply from the bot.';

      // Add bot message to state
      const newBotMessage: Message = { sender: 'bot', text: botReplyText };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    } catch (error) {
      console.error('Error sending message to webhook:', error);
      // Add an error message to the chat if the webhook call fails
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, I am having trouble connecting to the AI agent.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-row h-screen bg-gradient-to-br from-[#669bbc] to-[#003049]"> {/* Main container: Always row */}
      {/* Left Column: Chat Interface */}
      <div className="flex flex-col w-2/3 border-r border-gray-300"> {/* Chat column: Fixed 2/3 width */}
        {/* Logo Area */}
        <div className="p-4 bg-[#003049] text-white text-2xl font-bold flex justify-between items-center">
          <span>Neutrōn</span>
          <Link href="/" className="text-sm text-blue-300 hover:underline">
            Home
          </Link>
        </div>
        <MessageArea messages={messages} />
        <InputArea onSendMessage={handleSendMessage} />
      </div>

      {/* Right Column: Data Panel */}
      <div className="flex flex-col w-1/3 p-4 overflow-y-auto"> {/* Data Panel column: Fixed 1/3 width */}
        <h2 className="text-xl font-bold mb-4 text-white">Real-time Data (Simulated)</h2>
        <DataPanel agriculturalPrices={agriculturalData} cryptoPrices={cryptoData} />
      </div>
    </div>
  );
}
