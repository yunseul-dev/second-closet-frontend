import { useQuery } from '@tanstack/react-query';
import { fetchMessage } from '../../api/messages';
interface ProductInfo {
  productName: string;
  price: string;
  createdAt: number;
  img: string;
}

type Messages = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface Message {
  messageId: string;
  sellerId: string;
  buyerId: string;
  messages: Messages[];
  productInfo: ProductInfo;
}

const staleTime = 1000 * 3;

const useMessageQuery = (messageId: string | undefined) => {
  const query = useQuery({
    queryKey: ['@MessageInfo', messageId],
    queryFn: () => fetchMessage(messageId),
    staleTime,
  });

  return { ...query, messageInfo: query.data[0] as Message };
};

export default useMessageQuery;
