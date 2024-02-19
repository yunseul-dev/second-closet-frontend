import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { fetchUser } from '../../api/user';

const staleTime = 1000 * 3;

const useUserQuery = () => {
  const userId = useRecoilValue(userState);

  const query = useQuery({
    queryKey: ['@UserInfo', userId],
    queryFn: () => fetchUser(),
    staleTime,
  });

  return { ...query, userInfo: query.data };
};

export default useUserQuery;
