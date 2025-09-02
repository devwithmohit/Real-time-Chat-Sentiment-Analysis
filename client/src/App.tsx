
// import { useEffect, useState, useContext } from "react";
// import ChatWindow from "./Components/Chatwindow";
// import MessageInput from "./Components/MessageInput";
// import MoodPieChart from "./Components/MoodPieChart";
// import type { ChatMessage } from "./types/message";
// import { SocketContext } from "./context/SocketContext";

// function App() {
//   const socket = useContext(SocketContext);
//   const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);

//   useEffect(() => {
//     socket?.on("receiveMessage", (msg: ChatMessage) => {
//       console.log("💬 New message from backend:", msg);
//       setAllMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket?.off("receiveMessage");
//     };
//   }, [socket]);

//   return (
//     <div className="max-w-2xl mx-auto mt-10">
//       <ChatWindow messages={allMessages} />
//       <MoodPieChart messages={allMessages} />
//       <MessageInput setMessages={setAllMessages} />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState, useContext } from "react";
import ChatWindow from "./Components/Chatwindow";
import MessageInput from "./Components/MessageInput";
import MoodPieChart from "./Components/MoodPieChart";
import type { ChatMessage } from "./types/message";
import { SocketContext } from "./context/SocketContext";

function App() {
  const socket = useContext(SocketContext);
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on("receiveMessage", (msg: ChatMessage) => {
      console.log("💬 New message from backend:", msg);
      setAllMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  if (!socket) {
    return <div className="text-center mt-10">Socket not available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className={`mb-4 p-2 text-center rounded ${
        isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
      <ChatWindow messages={allMessages} />
      <MoodPieChart messages={allMessages} />
      <MessageInput setMessages={setAllMessages}/>
    </div>
  );
}

export default App;