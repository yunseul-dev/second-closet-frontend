import styled from 'styled-components';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { RxDividerVertical } from 'react-icons/rx';
import axios from 'axios';
import { userState } from '../../recoil/atom/userState';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { useNavigate } from 'react-router-dom';
import { Dispatch, useState, SetStateAction } from 'react';
import Modal from '../common/Modal';
import WithdrawalModal from './WithdrawalModal';
import useUserQuery from '../../hooks/queries/useUserQuery';

interface DivProp {
  $bold: boolean;
}

interface DivPencilProp {
  size: number;
}

interface MyInfoProps {
  setIsInfoEdit: Dispatch<SetStateAction<string>>;
  isInfoEdit: string;
}

const MyInfo: React.FC<MyInfoProps> = ({ setIsInfoEdit, isInfoEdit }) => {
  const setUserId = useSetRecoilState<string | null>(userState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const navigate = useNavigate();

  const { userInfo } = useUserQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleProductsClick = () => setIsInfoEdit('상품');
  const handleInfoClick = () => setIsInfoEdit('회원정보');

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
          <StoreName>{userInfo.userName}'s 옷장</StoreName>
        </StoreInfo>
        <StoreAdmin>
          <TabName $bold={isInfoEdit === '상품'} onClick={handleProductsClick}>
            나의 상품
          </TabName>
          <Divider>
            <RxDividerVertical />
          </Divider>
          <TabName $bold={isInfoEdit === '회원정보'} onClick={handleInfoClick}>
            회원정보 수정
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
