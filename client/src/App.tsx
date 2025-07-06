
import { useEffect, useState, useContext } from "react";
import ChatWindow from "./Components/Chatwindow";
import MessageInput from "./Components/MessageInput";
import MoodPieChart from "./Components/MoodPieChart";
import type { ChatMessage } from "./types/message";
import { SocketContext } from "./context/SocketContext";

function App() {
  const socket = useContext(SocketContext);
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket?.on("receiveMessage", (msg: ChatMessage) => {
      console.log("💬 New message from backend:", msg);
      setAllMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ChatWindow messages={allMessages} />
      <MoodPieChart messages={allMessages} />
      <MessageInput setMessages={setAllMessages} />
    </div>
  );
}

export default App;
