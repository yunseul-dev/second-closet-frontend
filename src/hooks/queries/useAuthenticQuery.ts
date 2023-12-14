import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, isLoginState } from '../../recoil/atom';
import { checkVerify } from '../../api/auth';

const useAuthenticationQuery = () => {
  const setUserId = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const { isSuccess, isFetched, data } = useQuery({
    queryKey: ['@Authenticated'],
    queryFn: () => checkVerify(),
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
