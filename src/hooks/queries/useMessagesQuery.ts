import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import axios from 'axios';

interface Message {
  senerId: string;
  message: string;
  timestamp: number;
}

interface Messages {
  messageId: number;
  partner: string;
  messages: Message[];
}

const fetchMessages = async (userId: string) => {
  const { data } = await axios.get(`/api/messages/${userId}`);

  return data;
};

const staleTime = 1000 * 3;

const useMessagesQuery = (sortOption: string) => {
  const userId = useRecoilValue(userState) || '';

  const query = useQuery({
    queryKey: ['@MyMessages', sortOption],
    queryFn: () => fetchMessages(userId),
    staleTime,
  });

  return { ...query, messagesInfo: query.data as Messages[] };
};

export default useMessagesQuery;
