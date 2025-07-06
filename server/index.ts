import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Sentiment from "sentiment";

// App setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ Frontend port
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chatroom backend is running");
});
// Sentiment analyzer instance
const sentiment = new Sentiment();

// Listen to socket connection
io.on("connection", (socket) => {
  console.log(`🔌 New user connected: ${socket.id}`);

  socket.on("sendMessage", (data: { text: string }) => {
    console.log("📨 Message received from frontend:", data.text); // <-- ✅ Add this
    const { text } = data;

    // Analyze sentiment
    const result = sentiment.analyze(text);
    const score = result.score;
    const sentimentLabel =
      score > 0 ? "positive" : score < 0 ? "negative" : "neutral";

    const message = {
      text,
      sentiment: sentimentLabel,
      score,
      createdAt: new Date().toISOString(),
    };
    console.log("📤 Emitting message to clients:", message); // <-- ✅ Also log this
    // Emit to all clients
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Chatroom backend is running");
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
