import styled from 'styled-components';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { RxDividerVertical } from 'react-icons/rx';
import { FaRegFaceGrinBeam } from 'react-icons/fa6';

interface DivProp {
  $bold: boolean;
}

interface DivNameProp {
  $clicked: boolean;
}

const MyCloset = () => {
  return (
    <Container>
      <MyInfo>
        <Character>
          <FaRegFaceGrinBeam />
        </Character>
        <StoreContainer>
          <StoreInfo>
            <StoreName>test님의 옷장</StoreName>
            <Pencil>
              <PiPencilSimpleLineBold />
            </Pencil>
          </StoreInfo>
          <div>상품 관리하기</div>
          <Account>나의 계정 관리하기</Account>
        </StoreContainer>
      </MyInfo>

      <MyList>
        <ListTab>
          <ListName $clicked={true}>상품</ListName>
          <ListName $clicked={false}>찜</ListName>
          <ListName $clicked={false}>옷장 후기</ListName>
          <Empty />
        </ListTab>
        <div>
          <ListCount>
            <div>전체 상품 86</div>
            <Sort>
              <SortTab $bold={true}>전체</SortTab>
              <Divider>
                <RxDividerVertical />
              </Divider>
              <SortTab $bold={false}>판매중</SortTab>
              <Divider>
                <RxDividerVertical />
              </Divider>
              <SortTab $bold={false}>판매완료</SortTab>
            </Sort>
          </ListCount>
        </div>
      </MyList>
    </Container>
  );
};

export default MyCloset;

const Container = styled.div``;

const MyInfo = styled.div`
  margin-bottom: 20px;
  width: 100%;
  height: 250px;
  background-color: #fdecd0;
  display: flex;
`;

const Character = styled.div`
  margin: 20px;
  width: 200px;
  height: 200px;
  border: 5px solid #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 100px;
  color: #fff;
`;

const StoreContainer = styled.div`
  margin: 20px;
  font-size: 20px;
`;

const StoreInfo = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Gaegu';
  font-weight: 500;
  padding: 20px;
`;

const StoreName = styled.div`
  font-size: 38px;
  justify-content: center;
`;

const Pencil = styled.div`
  font-size: 16px;
`;

const Account = styled.div``;

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
  border: 1px solid #000;

  font-weight: ${({ $clicked }) => $clicked && '600'};
  background-color: ${({ $clicked }) => $clicked && '#fee4e4'};
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
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;

const SortTab = styled.div<DivProp>`
  font-weight: ${({ $bold }) => $bold && '600'};
`;
