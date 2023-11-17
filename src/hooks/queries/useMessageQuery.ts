import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

  return { ...query, messageInfo: query.data[0] };
};

export default useMessageQuery;
