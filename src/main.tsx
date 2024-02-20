import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';

const socket = io('http://52.78.37.10:80', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

export const SocketContext = createContext(socket);

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('message', data => {
  console.log(data);
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
