import styled from 'styled-components';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { RxDividerVertical } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import MyProducts from './MyProducts';
import MyHearts from './MyHearts';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { userState } from '../../recoil/atom/userState';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { useNavigate } from 'react-router-dom';

interface DivProp {
  $bold: boolean;
}

interface DivNameProp {
  $clicked: boolean;
}

interface DivPencilProp {
  size: number;
}

const MyCloset = () => {
  const [category, setCategory] = useState('products');
  const queryClient = useQueryClient();
  const [userId, setUserId] = useRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => setCategory(category);

  useEffect(() => {
    queryClient.refetchQueries();
  }, []);

  const handleSignoutClick = async () => {
    const isLogin = await axios.get('api/auth/signout', { withCredentials: true });

    setUserId(null);
    localStorage.removeItem('user');
    setIsLogin(isLogin);
    navigate('/');
  };

  const handleWithdrawClick = async () => {
    await axios.delete(`/api/users/withdraw/${userId}`);

    setUserId(null);
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/');
  };

  return (
    <Container>
      <MyInfo>
        <StoreContainer>
          <StoreInfo>
            <StoreName>주성's 옷장</StoreName>
            <Pencil size={20}>
              <PiPencilSimpleLineBold />
            </Pencil>
          </StoreInfo>
          <StoreAdmin>
            <TabName $bold={true}>정보 관리</TabName>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <TabName $bold={false}>회원정보 수정</TabName>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <TabName $bold={false} onClick={handleWithdrawClick}>
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
      </MyInfo>
      <MyList>
        <ListTab>
          <ListName $clicked={category === 'products'} onClick={() => handleCategoryClick('products')}>
            상품
          </ListName>
          <ListName $clicked={category === 'hearts'} onClick={() => handleCategoryClick('hearts')}>
            찜
          </ListName>
          <ListName $clicked={category === 'reviews'} onClick={() => handleCategoryClick('reviews')}>
            옷장 후기
          </ListName>
          <Empty />
        </ListTab>
        {category === 'products' ? <MyProducts /> : category === 'hearts' ? <MyHearts /> : <></>}
      </MyList>
    </Container>
  );
};

export default MyCloset;

const Container = styled.div``;

const MyInfo = styled.div`
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

const MyList = styled.div``;

const ListTab = styled.div`
  display: flex;
`;

const ListName = styled.div<DivNameProp>`
  width: 200px;
  height: 48px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;

  font-weight: ${({ $clicked }) => $clicked && '600'};
  border: ${({ $clicked }) => $clicked && '1px solid #000'};
  border-bottom: ${({ $clicked }) => ($clicked ? 'none' : '1px solid #000')};
`;

const Empty = styled.div`
  width: calc(100% - (200px * 3));
  height: 48px;
  border-bottom: 1px solid #000;
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;
