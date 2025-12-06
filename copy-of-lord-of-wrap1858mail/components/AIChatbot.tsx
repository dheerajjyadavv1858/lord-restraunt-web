import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { MENU_ITEMS } from '../constants';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm the Lord of Wrap's Assistant. Hungry? I can suggest the best wraps for you!", timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Client
  // Using process.env.API_KEY as strictly instructed
  const aiRef = useRef<GoogleGenAI | null>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Prepare context from menu
        const menuContext = MENU_ITEMS.map(item => 
            `${item.name} (${item.category}): ₹${item.price}. ${item.description}. ${item.isSpicy ? 'Spicy' : ''} ${item.isBestseller ? 'Bestseller' : ''}`
        ).join('\n');

        chatSessionRef.current = aiRef.current.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are the friendly, appetizing AI assistant for 'Lord of Wrap's' in Chandigarh. 
                Your goal is to make the user hungry and help them order. 
                Here is the menu:\n${menuContext}\n
                Keep answers short, punchy, and use emojis. 
                If asked about delivery, say we deliver in 30 mins across Chandigarh.
                If asked about location, say we are in Chandigarh.`,
            },
        });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
        const text = result.text;
        
        setMessages(prev => [...prev, { role: 'model', text: text, timestamp: new Date() }]);
    } catch (error) {
        console.error("Chat Error", error);
        setMessages(prev => [...prev, { role: 'model', text: "Oops! My brain froze (like a slushie). Try again?", timestamp: new Date() }]);
    } finally {
        setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors ${isOpen ? 'bg-gray-800 text-white hidden' : 'bg-gradient-to-r from-orange-500 to-red-600 text-white'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 font-sans"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Wrap Assistant</h3>
                        <p className="text-[10px] opacity-80 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Online</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors"><X size={20} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2 mt-1 shrink-0"><Sparkles size={14} className="text-orange-500"/></div>}
                        <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2 shrink-0"><Sparkles size={14} className="text-orange-500"/></div>
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
                <div className="relative flex items-center">
                    <input 
                        type="text" 
                        className="w-full bg-gray-100 border-0 rounded-full pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Ask for recommendations..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="absolute right-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;