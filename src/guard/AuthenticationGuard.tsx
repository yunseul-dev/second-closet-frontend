import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userState, isLoginState } from '../recoil/atom';

interface AuthenticationGuardProps {
  redirectTo: string;
  element: ReactNode;
}

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ redirectTo, element }) => {
  const setUserId = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/auth/verify', { withCredentials: true });
        const data = res.data;

        if (data && !data.userId) {
          setUserId(null);
          setIsLogin(data.isLogin);
        }

        if (data && data.userId) {
          setUserId(data.userId);
          setIsLogin(data.isLogin);
        }
      } catch (error) {
        console.error('Error occurred while verifying authentication:', error);
      }
    };

    fetchData();
  }, [setUserId, setIsLogin]);

  return isLogin ? <>{element}</> : <Navigate to={redirectTo} />;
};

export default AuthenticationGuard;
