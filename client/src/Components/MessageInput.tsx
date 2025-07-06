import React, { useState, useContext, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { SocketContext } from "../context/SocketContext";
import type { ChatMessage } from "../types/message";

interface MessageInputProps {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const MessageInput: React.FC<MessageInputProps> = ({ }) => {
  const socket = useContext(SocketContext);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Emit to backend
    socket?.emit("sendMessage", { text });

    // Optimistically update frontend
    // const newMessage: ChatMessage = {
    //   text,
    //   sentiment: "positive",
    //   score: 0, 
    // setMessages((prev) => [...prev, newMessage]);

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded shadow-sm"
        autoComplete="off"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={!text.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
