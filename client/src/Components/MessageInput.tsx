import React, { useState, useContext, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { SocketContext } from "../context/SocketContext";

const MessageInput: React.FC = () => {
  const socket = useContext(SocketContext);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    socket?.emit("sendMessage", { text });
    setText("");
    
    // Reset loading state after a short delay
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-4 pr-16 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors bg-white/80 placeholder-gray-400"
            autoComplete="off"
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-gray-400 text-sm">
              {text.length}/500
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              !text.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xlanimate-pulse-glow'
            }`}
            disabled={!text.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <span>Send Message</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setText("")}
            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="Clear message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;


