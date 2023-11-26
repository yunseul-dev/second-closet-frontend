import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, isLoginState } from '../../recoil/atom';
import axios from 'axios';
import { useEffect } from 'react';

const useAuthenticationQuery = () => {
  const setUserId = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const { isSuccess, isFetched, data } = useQuery({
    queryKey: ['@Authenticated'],
    queryFn: async () => {
      const res = await axios.get('/api/auth/verify', { withCredentials: true });

      return res.data;
    },
    staleTime: 1000,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && !data.userId) {
      setUserId(null);
      setIsLogin(data.isLogin);
    }

    if (isSuccess && data.userId) {
      setUserId(data.userId);
      setIsLogin(data.isLogin);
    }
  }, [data, isSuccess, setIsLogin, setUserId]);

  return { isFetched, isLogin };
};

export default useAuthenticationQuery;
