import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

// Type for the context value
export const SocketContext = createContext<Socket | null>(null);

// Create the socket instance (change URL as needed)
export const socket = io('http://localhost:3000'); // 🔁 Replace with your backend URL
