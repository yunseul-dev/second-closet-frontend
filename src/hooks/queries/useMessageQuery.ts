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
  messages: Messages[];
  productInfo: ProductInfo;
}

const fetchProduct = async (id: number) => {
  const { data } = await axios.get(`/api/messages/${id}`);
  return data;
};

const staleTime = 1000;

const useMessageQuery = (messageId: number) => {
  const query = useQuery({
    queryKey: ['@MessageInfo', messageId],
    queryFn: () => fetchProduct(messageId),
    staleTime,
  });

  return { ...query, messageInfo: query.data[0] as Message };
};

export default useMessageQuery;
