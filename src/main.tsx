import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';

const socket = io('https://port-0-second-closet-backend-1ffi5z2alr8v333q.sel5.cloudtype.app/');
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
