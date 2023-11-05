import styled from 'styled-components';
import useObserver from '../../hooks/useObserver';
import { AiOutlineEdit, AiOutlineHeart } from 'react-icons/ai';
import { useState, useCallback, useEffect } from 'react';
import useMyProductInfiiteQuery from '../../hooks/queries/useMyProductInfiniteQuery';
import formatTimeAgo from '../../utils/formatTimeAgo';
import { useNavigate } from 'react-router-dom';
import { RxDividerVertical } from 'react-icons/rx';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  hearts: number;
  createdAt: number;
  sold: boolean;
}

interface DivPencilProp {
  size: number;
}

interface DivProp {
  $bold: boolean;
}

interface MyProductsProps {
  userId: string;
}

const MyProducts = ({ userId }: MyProductsProps) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<string>('all');

  const { data, hasNextPage, fetchNextPage } = useMyProductInfiiteQuery(userId.replace(/"/g, ''), sortOption);

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    getNextPage();
  }, [getNextPage]);

  const observerRef = useObserver(getNextPage);

  const handleOptionClick = (sortOption: string) => setSortOption(sortOption);

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
        {data.map(({ productId, productName, imgs, price, delivery, hearts, createdAt }: Product) => {
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
                  {hearts} <AiOutlineHeart />
                </MiniInfo>
                <Edit>
                  <Pencil size={30}>
                    <AiOutlineEdit />
                  </Pencil>
                </Edit>
              </ItemInfoContainer>
            </Item>
          );
        })}
      </ItemContainer>
      {hasNextPage && <div ref={observerRef}>Observer</div>}
    </>
  );
};

export default MyProducts;

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

const Pencil = styled.div<DivPencilProp>`
  margin: 5px;
  font-size: ${({ size }) => size && `${size}px`};
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
