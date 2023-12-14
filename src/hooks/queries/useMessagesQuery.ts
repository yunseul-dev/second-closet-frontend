import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { fetchMessages } from '../../api/messages';

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
