import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_URL}`);
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
