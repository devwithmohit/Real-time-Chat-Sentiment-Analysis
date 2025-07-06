chatroom-sentiment-app/
├── client/                            # React Frontend (TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── MoodPieChart.tsx
│   │   ├── types/
│   │   │   └── message.d.ts
│   │   ├── context/
│   │   │   └── SocketContext.tsx
│   │   ├── utils/
│   │   │   └── sentimentColors.ts
│   │   └── App.tsx
│   └── vite.config.ts
│
├── server/                            # Node.js Backend (TypeScript)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── chatController.ts
│   │   ├── models/
│   │   │   └── Message.ts
│   │   ├── routes/
│   │   │   └── messages.ts
│   │   ├── services/
│   │   │   └── sentimentService.ts
│   │   ├── socket/
│   │   │   └── socketHandler.ts
│   │   ├── utils/
│   │   │   └── types.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
