import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import useGenericMutation from './useGenericMutation';

interface ProductInfo {
  productName: string;
  price: string;
  createdAt: number;
}

type Messages = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface Message {
  messageId: string;
  messages: Messages[];
  productInfo: ProductInfo;
}

const sendMessage = async ({
  messageId,
  userId,
  textValue,
}: {
  messageId: string;
  userId: string | null;
  textValue: string;
}) =>
  await axios.patch(`/api/messages/update/${messageId}`, {
    senderId: userId,
    message: textValue,
  });

const useSendMessageMutation = (messageId: string) => {
  const userId = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: ['@MessageInfo', messageId],
    mutationFn: sendMessage,
    onMutate({ textValue }) {
      return (messageInfo: Message[]) => [
        {
          ...messageInfo[0],
          messages: [...messageInfo[0].messages, { senderId: userId, message: textValue, timestamp: Date.now() }],
        },
      ];
    },
  });
};

export default useSendMessageMutation;
