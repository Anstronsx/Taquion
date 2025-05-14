// src/app/page.tsx
'use client';

import Link from 'next/link';
import { MessageCircle, Twitter, Linkedin, Instagram, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div 
      className="flex flex-col min-h-screen text-foreground"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, hsl(var(--background-gradient-start-sky-blue-hsl)), hsl(var(--background-gradient-end-light-cyan-hsl)))'
      }}
    >
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <Cpu size={32} />
            <span>AetherChat</span>
          </div>
          <Link href="/chat">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Go to Chat
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <Cpu size={64} className="mb-6 text-primary" />
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-primary drop-shadow-md">
          AetherChat
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl text-foreground/80">
          Your intelligent conversational partner, seamlessly connecting with powerful AI agents.
        </p>
        <Link href="/chat">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
            Start Chatting Now
          </Button>
        </Link>
      </main>

      {/* Footer Section */}
      <footer className="bg-transparent text-foreground/70 p-6 text-center mt-auto">
        <div className="container mx-auto flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
          <div className="flex space-x-6 mb-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition duration-300">
              <Twitter size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition duration-300">
              <Linkedin size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition duration-300">
              <Instagram size={24} />
            </a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} AetherChat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
