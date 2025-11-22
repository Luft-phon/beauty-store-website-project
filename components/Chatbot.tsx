import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Language, Service } from '../types';

interface ChatbotProps {
  language: Language;
  services: Service[];
}

const Chatbot: React.FC<ChatbotProps> = ({ language, services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Hello! I am Lumi. How can I help you today?`, timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare context for Gemini
    const serviceList = services.map(s => `${s.name} ($${s.price})`).join(', ');
    const context = `Available Services: ${serviceList}.`;

    try {
      const replyText = await sendMessageToGemini(userMsg.text, language, context);
      setMessages(prev => [...prev, { role: 'model', text: replyText, timestamp: new Date() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:bg-gold-500 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        >
          <MessageSquare size={28} className="group-hover:hidden" />
          <Sparkles size={28} className="hidden group-hover:block" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-stone-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-serif font-bold tracking-wide">Lumi AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-stone-800 text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100">
                   <div className="flex space-x-1">
                     <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-75"></div>
                     <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></div>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-stone-100 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about prices, services..."
              className="flex-1 p-2 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-gold-500 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-700 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;