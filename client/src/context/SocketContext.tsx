import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

// Type for the context value
export const SocketContext = createContext<Socket | null>(null);

// Create the socket instance (change URL as needed)
export const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
      autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
}); // 🔁 Replace with your backend URL
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});