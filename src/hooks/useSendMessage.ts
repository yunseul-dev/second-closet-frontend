import { useContext } from 'react';
import { SocketContext } from '../main';

const useSendMessage = () => {
  const socket = useContext(SocketContext);

  const sendMessage = ({
    messageId,
    userId,
    textValue,
  }: {
    messageId: string;
    userId: string | null;
    textValue: string;
  }) => {
    socket.emit('message', { messageId, userId, textValue });
  };

  return sendMessage;
};

export default useSendMessage;
