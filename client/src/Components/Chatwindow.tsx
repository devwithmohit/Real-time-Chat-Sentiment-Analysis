import React, { useRef, useEffect } from "react";
import type { ChatMessage } from "../types/message";

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 rounded shadow-md";
      case "negative":
        return "bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 rounded shadow-md";
      case "neutral":
        return "bg-gradient-to-r from-slate-400 to-gray-500 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 rounded shadow-md";
      default:
        return "bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 rounded shadow-md";
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "😊";
      case "negative":
        return "😠";
      case "neutral":
        return "😐";
      default:
        return "💬";
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <h2 className="text-white font-semibold flex items-center gap-2">
          💬 Chat Messages
          {messages.length > 0 && (
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {messages.length}
            </span>
          )}
        </h2>
      </div>

      <div className="h-[500px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-6xl mb-4">💭</div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="group animate-bounce-in">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getSentimentStyle(
                    msg.sentiment
                  )}`}
                >
                  {getSentimentEmoji(msg.sentiment)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                    <p className="text-gray-800 leading-relaxed">{msg.text}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          msg.sentiment === "positive"
                            ? "bg-emerald-100 text-emerald-700"
                            : msg.sentiment === "negative"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {getSentimentEmoji(msg.sentiment)}
                        {msg.sentiment}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
