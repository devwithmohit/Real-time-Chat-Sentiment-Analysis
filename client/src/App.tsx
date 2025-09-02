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
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              💬 Real-time Chat
            </h1>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isConnected 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-rose-100 text-rose-700 border border-rose-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-emerald-500' : 'bg-rose-500'
              } animate-pulse`}></div>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2 space-y-6">
            <ChatWindow messages={allMessages} />
            <MessageInput/>
          </div>
          
          {/* Analytics Section */}
          <div className="space-y-6">
            <MoodPieChart messages={allMessages} />
            
            {/* Stats Cards */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Messages</span>
                  <span className="font-bold text-indigo-600">{allMessages.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${isConnected ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isConnected ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;