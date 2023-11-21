import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../../recoil/atom/userState';
import { isLoginState } from '../../../recoil/atom/isLoginState';
import { useNavigate } from 'react-router-dom';

interface WithDrawalProps {
  closeModal: () => void;
}

const WithdrawalModal: React.FC<WithDrawalProps> = ({ closeModal }) => {
  const [userId, setUserId] = useRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const navigate = useNavigate();

  const handleWithdrawClick = async () => {
    const isLogin = await axios.delete(`api/auth/withdraw/${userId}`);

    setUserId(null);
    localStorage.removeItem('user');
    setIsLogin(isLogin);
    navigate('/');
  };

  return (
    <Container>
      <Title>회원탈퇴</Title>
      <Content>
        회원님의 closet이 삭제되며 복구 불가능합니다.
        <br /> 이에 동의하십니까?
      </Content>
      <ButtonContainer>
        <XBtn onClick={closeModal}>아니오</XBtn>
        <OBtn onClick={handleWithdrawClick}>예</OBtn>
      </ButtonContainer>
    </Container>
  );
};

export default WithdrawalModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  right: 0;
  position: absolute;
`;

const Button = styled.button`
  margin-left: 10px;
  border: 1px solid;
  padding: 10px;
`;

const OBtn = styled(Button)`
  background-color: #ff4d24;
  border: solid 1px #fe4218;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;
