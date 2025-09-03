import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SocketContext, socket } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>

);
