import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { usePopularInfiniteQuery } from '../../hooks/queries';
import { useObserver } from '../../hooks';
import { AiOutlineHeart, BsBalloonHeartFill } from '../../utils/icons';
import Loading from '../skeletons/Loading';
import Banner from './Banner';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  hearts: number;
  price: string;
}

const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { products, hasNextPage, fetchNextPage } = usePopularInfiniteQuery();
  const navigate = useNavigate();

  const getNextPage = useCallback(() => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);
    fetchNextPage();
    setIsLoading(false);
  }, [fetchNextPage, isLoading, hasNextPage]);

  useEffect(() => {
    getNextPage();
  }, [getNextPage]);

  const observerRef = useObserver(getNextPage);

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <>
      <Banner />
      <Title>
        오늘의 인기 상품 <BsBalloonHeartFill />
      </Title>
      <ItemContainer>
        {products.map(({ productId, productName, imgs, hearts, price }: Product) => {
          return (
            <Item key={productId} onClick={() => handleClick(productId)}>
              <ImageContainer>
                <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} alt={productName} loading="lazy" />
              </ImageContainer>
              <ItemInfoContainer>
                <ItemName>{productName}</ItemName>
                <ItemInfo>
                  <div>
                    <Price>{price}</Price>원
                  </div>
                  <MiniInfo>
                    <AiOutlineHeart />
                    <div>{hearts}</div>
                  </MiniInfo>
                </ItemInfo>
              </ItemInfoContainer>
            </Item>
          );
        })}
      </ItemContainer>
      {hasNextPage && (
        <div ref={observerRef}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Main;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0;
  color: #ff4d24;
  display: flex;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 24%;
  height: 300px;
  margin: 5px;
  border: 1px solid #e0e0e0c4;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 230px;
`;

const Image = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;

const ItemInfoContainer = styled.div`
  font-size: 14px;
  height: 60px;
  padding: 10px 20px 10px 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const MiniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
