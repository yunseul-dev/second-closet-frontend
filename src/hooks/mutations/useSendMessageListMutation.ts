import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import useGenericMutation from './useGenericMutation';

type LatesMessage = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface Message {
  messageId: string;
  partner: string;
  messages: LatesMessage[];
}

const useSendMessageListMutation = (sortOption: string) => {
  const userId = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: ['@MyMessages', sortOption],
    onMutate({ messageId, partner, textValue }: { messageId: string; partner: string; textValue: string }) {
      return (messagesInfo: Message[]) =>
        messagesInfo.map(message =>
          message.messageId === messageId
            ? {
                messageId: messageId,
                partner: partner,
                messages: [
                  ...message.messages,
                  {
                    senderId: userId,
                    message: textValue,
                    timestamp: Date.now(),
                  },
                ],
              }
            : message,
        );
    },
  });
};

export default useSendMessageListMutation;
