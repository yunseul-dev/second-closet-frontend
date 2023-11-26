import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import axios from 'axios';

const staleTime = 1000 * 3;

const fetchData = async (userId: string) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  return data;
};

const useUserQuery = () => {
  const userId = useRecoilValue(userState);

  const query = useQuery({
    queryKey: ['@UserInfo', userId],
    queryFn: () => fetchData(userId || ''),
    staleTime,
  });

  return { ...query, userInfo: query.data };
};

export default useUserQuery;
