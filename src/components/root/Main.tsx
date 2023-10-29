import { styled } from 'styled-components';

const Main = () => {
  return (
    <>
      <Banner>
        <BannerMent>옷장 속에 잠자는 옷의 새 옷장을 찾아주세요.</BannerMent>
      </Banner>
      <Title>오늘의 인기 상품</Title>
      <ItemContainer>
        {Array.from({ length: 8 }, () => 0).map(item => {
          return <Item></Item>;
        })}
      </ItemContainer>
    </>
  );
};

export default Main;

const Banner = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f6f6c7;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const BannerMent = styled.div`
  font-family: 'Gaegu';
  font-size: 48px;
  font-weight: 400;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 20px 0;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 20%;
  height: 200px;
  margin: 10px;
  border: 1px solid gray;
`;
