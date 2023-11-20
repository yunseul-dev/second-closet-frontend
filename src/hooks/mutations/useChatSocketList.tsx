import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SocketContext } from '../../main';

type Message = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface Messages {
  messageId: number;
  partner: string;
  buyerId: string;
  sellerId: string;
  messages: Message[];
}

interface NewMessage {
  messageId: number;
  partner: string | undefined;
  messages: Messages[];
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
