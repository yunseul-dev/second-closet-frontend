import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  sellerId: string;
  buyerId: string;
  messages: Messages[];
  productInfo: ProductInfo;
}

const fetchMessage = async (id: number) => {
  const { data } = await axios.get(`/api/messages/message/${id}`);

  return data;
};

const staleTime = 1000 * 3;

const useMessageQuery = (messageId: number) => {
  const query = useQuery({
    queryKey: ['@MessageInfo', messageId],
    queryFn: () => fetchMessage(messageId),
    staleTime,
  });

  return { ...query, messageInfo: query.data[0] as Message };
};

export default useMessageQuery;
