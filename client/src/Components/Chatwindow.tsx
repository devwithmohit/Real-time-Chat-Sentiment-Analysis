

import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../types/message';
import { sentimentColors } from '../utils/sentimentColors';

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[400px] overflow-y-auto p-4 border rounded-lg bg-white shadow-md">
      {messages.map((msg, i) => (
        <div key={i} className={`p-2 mb-2 rounded ${sentimentColors[msg.sentiment] || 'bg-gray-100'}`}>
          <p>{msg.text}</p>
          <small className="text-xs text-gray-500">{msg.sentiment}</small>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
