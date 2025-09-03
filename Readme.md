# Real-Time Chat with Sentiment Analysis

A modern full-stack web application for real-time chat with live sentiment analysis, built using React, TypeScript, Tailwind CSS, Socket.IO, and Node.js.

---

## Features

- 💬 **Real-Time Messaging:** Instant chat powered by Socket.IO.
- 😊 **Sentiment Analysis:** Each message is analyzed for positive, negative, or neutral sentiment.
- 📊 **Live Mood Visualization:** Interactive charts show sentiment distribution.
- 🖥️ **Responsive UI:** Beautiful, mobile-friendly design using Tailwind CSS.
- 🔒 **Type Safety:** Built with TypeScript on both client and server.
- ⚡ **Fast & Modern Stack:** Vite for frontend, Node.js for backend.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Chart.js, Socket.IO-client
- **Backend:** Node.js, TypeScript, Socket.IO
- **Visualization:** Chart.js (Pie chart for sentiment)
- **Styling:** Tailwind CSS

---

## Project Structure

```
real-time-chat/
├── client/      # React frontend
│   ├── src/
│   │   ├── Components/
│   │   ├── context/
│   │   ├── types/
│   │   └── index.css
│   ├── public/
│   └── ...
├── server/      # Node.js backend
│   ├── index.ts
│   ├── types/
│   └── ...
└── Readme.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/devwithmohit/Real-time-Chat-Sentiment-Analysis.git
cd real-time-chat
```

### 2. Install dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `client` folder:

```
VITE_BACKEND_URL=http://localhost:3000
```

### 4. Run the app

#### Start the backend server

```bash
cd server
npm run dev
```

#### Start the frontend

```bash
cd ../client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

- Type messages in the chat box.
- See live sentiment analysis for each message.
- View mood distribution in the chart sidebar.

---

## Folder Details

- **client/src/Components/**: UI components (Chatwindow, MessageInput, MoodPieChart)
- **client/src/context/**: React context for Socket.IO
- **client/src/types/**: TypeScript types
- **server/**: Node.js backend, Socket.IO server, sentiment analysis logic

---

## Customization

- Change colors and fonts in `client/src/index.css` and Tailwind config.
- Update sentiment analysis logic in `server/index.ts`.

---

## License

MIT

---

## Author 
Mohit Singh Rawat