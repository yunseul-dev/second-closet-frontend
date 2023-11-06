import styled from 'styled-components';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import formatTimeAgo from '../../utils/formatTimeAgo';
import useMyHeartsInfiniteQuery from '../../hooks/queries/useMyHeartsInfiniteQuery';
import useDeleteHeartMutation from '../../hooks/mutations/useDeleteHeartMutation';
import useObserver from '../../hooks/useObserver';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDividerVertical } from 'react-icons/rx';
import { useQueryClient } from '@tanstack/react-query';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  hearts: string[];
  createdAt: number;
  sold: boolean;
}

interface DivProp {
  $bold: boolean;
}

interface MyProductsProps {
  userId: string;
}

const MyHearts = ({ userId }: MyProductsProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleOptionClick = (sortOption: string) => setSortOption(sortOption);
  const [sortOption, setSortOption] = useState<string>('all');
  const { products, fetchNextPage, hasNextPage } = useMyHeartsInfiniteQuery(userId.replace(/"/g, ''), sortOption);

  const [id, setId] = useState(0);

  useEffect(() => {
    const queryKey = ['@MyHearts', sortOption];
    queryClient.invalidateQueries({ queryKey: queryKey });
  }, [sortOption]);

  const { mutate: deleteHeart } = useDeleteHeartMutation(sortOption, id);

  const handleHeartClick = (productId: number, userId: string) => {
    setId(productId);
    deleteHeart({ productId, userId });
  };

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    getNextPage();
  }, [getNextPage]);

  const observerRef = useObserver(getNextPage);

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <>
      <div>
        <ListCount>
          <div>전체 상품 86</div>
          <Sort>
            <SortTab $bold={sortOption === 'all'} onClick={() => handleOptionClick('all')}>
              전체
            </SortTab>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <SortTab $bold={sortOption === 'notSold'} onClick={() => handleOptionClick('notSold')}>
              판매중
            </SortTab>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <SortTab $bold={sortOption === 'sold'} onClick={() => handleOptionClick('sold')}>
              판매완료
            </SortTab>
          </Sort>
        </ListCount>
      </div>
      <ItemContainer>
        {products.map(({ productId, productName, imgs, price, delivery, hearts, createdAt }: Product) => {
          return (
            <Item key={productId}>
              <ImageContainer onClick={() => handleClick(productId)}>
                <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
              </ImageContainer>
              <ItemInfoContainer>
                <ItemName>{productName}</ItemName>
                <ItemInfo>
                  <div>
                    <Price>{price}</Price>원
                  </div>
                  <div>{delivery ? '무료배송' : '배송비 별도'}</div>
                </ItemInfo>
                <MiniInfo>
                  <div>{formatTimeAgo(createdAt)}</div>
                </MiniInfo>
                <MiniInfo>
                  {hearts.length} <AiOutlineHeart />
                </MiniInfo>
                <Buttons>
                  <HeartBtn onClick={() => handleHeartClick(productId, userId)}>
                    <AiFillHeart />
                  </HeartBtn>
                  <TalkBtn>문의하기</TalkBtn>
                  <BuyBtn>구매하기</BuyBtn>
                </Buttons>
              </ItemInfoContainer>
            </Item>
          );
        })}
      </ItemContainer>
      {hasNextPage && <div ref={observerRef}>Observer</div>}
    </>
  );
};

export default MyHearts;

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

const Buttons = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  position: absolute;
  top: 235px;
  right: 0;
  justify-content: flex-end;
  font-size: 16px;
  width: 100%;
`;

const TalkBtn = styled.button`
  width: 35%;
  height: 40px;
  border: solid 1px black;
  font-weight: 700;
  background-color: white;
`;

const BuyBtn = styled.button`
  width: 35%;
  height: 40px;
  border: solid 1px #fd7272;
  font-weight: 700;
  background-color: #f98181;
  color: white;
`;

const HeartBtn = styled.button`
  width: 15%;
  height: 40px;
  border: solid 1px black;
  font-weight: 700;
  background-color: white;
`;
