import styled from 'styled-components';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { RxDividerVertical } from 'react-icons/rx';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';

import MyProducts from './MyProducts';

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
  const userId = useRecoilValue(userState);

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
            <TabName $bold={false}>회원 탈퇴</TabName>
          </StoreAdmin>
        </StoreContainer>
      </MyInfo>
      <MyList>
        <ListTab>
          <ListName $clicked={true}>상품</ListName>
          <ListName $clicked={false}>찜</ListName>
          <ListName $clicked={false}>옷장 후기</ListName>
          <Empty />
        </ListTab>
        <MyProducts userId={userId} />
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

const ListCount = styled.div`
  font-size: 18px;
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;
`;

const Sort = styled.div`
  display: flex;
  margin-right: 20px;
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;

const SortTab = styled.div<DivProp>`
  font-weight: ${({ $bold }) => $bold && '600'};
  font-size: 14px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const Item = styled.div`
  padding: 30px;
  width: 48%;
  height: 350px;
  border: 1px solid #e0e0e0c4;
  display: flex;
`;

const ImageContainer = styled.div`
  width: 45%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemInfoContainer = styled.div`
  font-size: 14px;
  height: 60px;
  width: 55%;
  padding: 10px 20px 10px 20px;
  position: relative;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.div`
  width: 100%;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 15px;
`;

const MiniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px 0;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Edit = styled.div`
  position: absolute;
  top: 250px;
  right: 0;
`;
