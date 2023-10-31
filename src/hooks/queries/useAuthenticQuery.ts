import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import { isLoginState } from '../../recoil/atom/isLoginState';
import axios from 'axios';
import { useEffect } from 'react';

const useAuthenticationQuery = () => {
  const setUsesrId = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { isSuccess, isFetched, data } = useQuery({
    queryKey: ['@Authenticated'],
    queryFn: async () => {
      const res = await axios('api/auth/verify', { withCredentials: true });
      return res.data;
    },
    staleTime: 1000,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && !data.userId) {
      setUsesrId(null);
      setIsLogin(data.isLogin);
    }

    if (isSuccess && data.userId) {
      setUsesrId(data.userId);
      setIsLogin(data.isLogin);
    }
  }, [data, isSuccess, setIsLogin, setUsesrId]);

  return { isFetched, isLogin };
};

export default useAuthenticationQuery;
