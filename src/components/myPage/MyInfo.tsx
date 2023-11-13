import styled from 'styled-components';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { RxDividerVertical } from 'react-icons/rx';
import axios from 'axios';
import { userState } from '../../recoil/atom/userState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../common/Modal';
import WithdrawalModal from './WithdrawalModal';
import AccountInfoEditModal from './AccountInfoEditModal';

interface DivProp {
  $bold: boolean;
}

interface DivPencilProp {
  size: number;
}

const MyInfo = () => {
  const [userId, setUserId] = useRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  const handleSignoutClick = async () => {
    const isLogin = await axios.get('api/auth/signout', { withCredentials: true });

    setUserId(null);
    localStorage.removeItem('user');
    setIsLogin(isLogin);
    navigate('/');
  };

  return (
    <Container>
      <StoreContainer>
        <StoreInfo>
          <StoreName>{userId}'s 옷장</StoreName>
          <Pencil size={20}>
            <PiPencilSimpleLineBold />
          </Pencil>
        </StoreInfo>
        <StoreAdmin>
          <TabName $bold={true}>정보 관리</TabName>
          <Divider>
            <RxDividerVertical />
          </Divider>
          <TabName $bold={false} onClick={openInfoModal}>
            회원정보 수정
          </TabName>
          <Divider>
            <RxDividerVertical />
          </Divider>
          <TabName $bold={false} onClick={openModal}>
            회원 탈퇴
          </TabName>
          <Divider>
            <RxDividerVertical />
          </Divider>
          <TabName $bold={false} onClick={handleSignoutClick}>
            로그아웃
          </TabName>
        </StoreAdmin>
      </StoreContainer>
      {isModalOpen && (
        <Modal content={<WithdrawalModal closeModal={closeModal} />} closeModal={closeModal} size="small" />
      )}
      {isInfoModalOpen && (
        <Modal content={<AccountInfoEditModal closeModal={closeInfoModal} />} closeModal={closeInfoModal} size="big" />
      )}
    </Container>
  );
};

export default MyInfo;

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  margin-bottom: 20px;
`;

const TabName = styled.div<DivProp>`
  font-weight: ${({ $bold }) => $bold && '600'};
`;

const StoreContainer = styled.div`
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StoreInfo = styled.div`
  display: flex;
  font-family: 'Gaegu';
  font-weight: 500;
  padding: 10px;
`;

const StoreAdmin = styled.div`
  padding: 10px;
  font-size: 14px;
  display: flex;
`;

const StoreName = styled.div`
  font-size: 40px;
  justify-content: center;
  background-color: #fdecd0;
  border-radius: 30px;
  padding: 5px;
`;

const Pencil = styled.div<DivPencilProp>`
  margin: 5px;
  font-size: ${({ size }) => size && `${size}px`};
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;
