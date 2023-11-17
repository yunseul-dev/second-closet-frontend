import { styled } from 'styled-components';
import usePopularInfiniteQuery from '../../hooks/queries/usePopularInfiniteQuery';
import useObserver from '../../hooks/useObserver';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Loading from '../skeletons/Loading';
import { BsBalloonHeartFill } from 'react-icons/bs';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  hearts: number;
  price: string;
}

const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, hasNextPage, fetchNextPage } = usePopularInfiniteQuery() as {
    data: Product[];
    hasNextPage: boolean;
    fetchNextPage: () => void;
  };
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
      <Banner>
        <BannerImg src="/assets/image/Banner.jpg" alt="배너 이미지"></BannerImg>
      </Banner>
      <Title>
        오늘의 인기 상품 <BsBalloonHeartFill />
      </Title>
      <ItemContainer>
        {data.map(({ productId, productName, imgs, hearts, price }: Product) => {
          return (
            <Item key={productId} onClick={() => handleClick(productId)}>
              <ImageContainer>
                <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
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

const Banner = styled.div`
  width: 100%;
  height: 276px;
  background-color: #fdecd0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
  height: 100%;
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
