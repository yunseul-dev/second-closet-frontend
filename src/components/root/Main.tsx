import { styled } from 'styled-components';
import usePopularInfiniteQuery from '../../hooks/queries/usePopularInfiniteQuery';
import useObserver from '../../hooks/useObserver';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
}

const Main = () => {
  const { data, hasNextPage, fetchNextPage } = usePopularInfiniteQuery();
  const navigate = useNavigate();

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const observerRef = useObserver(getNextPage);

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <>
      <Banner>
        <BannerMent>옷장 속에 잠자는 옷을 깨워 새 옷장을 찾아주세요.</BannerMent>
      </Banner>
      <Title>오늘의 인기 상품</Title>
      <ItemContainer>
        {data?.pages.flat().map(({ productId, productName, imgs }: Product) => {
          return (
            <Item key={productId} onClick={() => handleClick(productId)}>
              <ImageContainer>
                <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
              </ImageContainer>
              <ItemName>{productName}</ItemName>
            </Item>
          );
        })}
      </ItemContainer>
      {hasNextPage && <div ref={observerRef}>Observer</div>}
    </>
  );
};

export default Main;

const Banner = styled.div`
  width: 100%;
  height: 250px;
  background-color: #fdecd0;
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
  width: 22%;
  height: 280px;
  margin: 10px;
  border: 1px solid #e0e0e0c4;
  align-items: center;
  justify-content: center;

  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemName = styled.div`
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-top: auto;
  position: relative;
  bottom: -20px;
`;
