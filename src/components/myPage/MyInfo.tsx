import styled from 'styled-components';
import { RxDividerVertical } from 'react-icons/rx';
import axios from 'axios';
import { userState } from '../../recoil/atom/userState';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
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

  const handleProductsClick = () => setIsInfoEdit('product');
  const handleInfoClick = () => setIsInfoEdit('userInfo');

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
          {isInfoEdit === 'product' ? <StoreName>{userInfo.userName}님의 옷장</StoreName> : <Title>계정 정보</Title>}
        </StoreInfo>
        <StoreAdmin>
          <TabName $bold={isInfoEdit === 'product'} onClick={handleProductsClick}>
            나의 상품
          </TabName>
          <Divider>
            <RxDividerVertical />
          </Divider>
          <TabName $bold={isInfoEdit === 'userInfo'} onClick={handleInfoClick}>
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
    </Container>
  );
};

export default MyInfo;

const Container = styled.div`
  width: 100%;
  height: 60px;
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
  font-weight: 500;
  padding: 10px;
  padding-top: 0;
`;

const StoreAdmin = styled.div`
  padding: 10px;
  font-size: 14px;
  display: flex;
`;

const StoreName = styled.div`
  font-size: 40px;
  justify-content: center;
  /* background-color: #fdecd0; */
  /* border-radius: 30px; */
  padding: 5px;
  font-family: 'Gaegu';
`;

const Title = styled.div`
  font-size: 24px;
  padding: 5px;
  font-weight: 600;
`;

const Pencil = styled.div<DivPencilProp>`
  margin: 5px;
  font-size: ${({ size }) => size && `${size}px`};
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;
