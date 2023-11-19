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
  latesMessage: LatesMessage;
}

const useSendMessageListMutation = (sortOption: string) => {
  const userId = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: ['@MyMessages', sortOption],
    onMutate({ messageId, partner, textValue }: { messageId: string; partner: string; textValue: string }) {
      return (messagesInfo: Message[]) => [
        ...messagesInfo,
        {
          messageId: messageId,
          parterner: partner,
          messages: { senderId: userId, message: textValue, timestamp: Date.now() },
        },
      ];
    },
  });
};

export default useSendMessageListMutation;
