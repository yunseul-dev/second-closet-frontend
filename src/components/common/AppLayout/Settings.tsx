import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoginState, userState } from '../../../recoil/atom';
import { LuUser2, PiSignOutBold, LuSettings } from '../../../utils/icons';
import { signOut } from '../../../api/auth';

const Settings = () => {
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const handleSignoutClick = async () => {
    console.log('here');
    const isLogin = await signOut();

    setUserId(null);
    localStorage.removeItem('user');
    setIsLogin(isLogin);
    navigate('/');
  };

  return (
    <Container>
      <MiniTab onClick={() => navigate('/mypage')}>
        <LuUser2 /> My 옷장
      </MiniTab>
      <MiniTab onClick={() => navigate('/accounts')}>
        <LuSettings /> My 계정
      </MiniTab>
      <MiniTab onClick={handleSignoutClick}>
        <PiSignOutBold /> 로그아웃
      </MiniTab>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  position: absolute;
  bottom: -110px;
  right: 0;
  width: 200%;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
`;

const MiniTab = styled.div`
  font-weight: 500;
  margin: 5px;
`;
