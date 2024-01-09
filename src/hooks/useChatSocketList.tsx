import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SocketContext } from '../main';

type Message = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface NewMessage {
  messageId: string;
  productId: string;
  partner: string | undefined;
  messages: Message[];
}

const useChatSocketList = (setMessages: Dispatch<SetStateAction<NewMessage[]>>) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('updateMessageList', (updatedMessageList: NewMessage[]) => {
      setMessages(updatedMessageList);
    });

    return () => {
      socket.off('updateMessageList');
    };
  }, [socket, setMessages]);
};

export default useChatSocketList;
