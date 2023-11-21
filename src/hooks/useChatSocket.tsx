import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SocketContext } from '../main';

type Messages = {
  senderId: string;
  message: string;
  timestamp: number;
};

type Message = {
  userId: string;
  textValue: string;
};

const useChatSocket = (messageId: string, setChatMessages: Dispatch<SetStateAction<Messages[]>>) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('message', (newMessage: Message) => {
      const { userId, textValue } = newMessage;
      setChatMessages(prevMessages => [
        ...prevMessages,
        { senderId: userId, message: textValue, timestamp: Date.now() },
      ]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket, messageId, setChatMessages]);
};

export default useChatSocket;
