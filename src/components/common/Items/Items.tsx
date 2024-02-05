import React from 'react';
import styled from 'styled-components';
import { formatTimeAgo } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from '../../../utils/icons';

interface Product {
  productId: string;
  productName: string;
  imgs: string;
  price: string;
  createdAt?: string;
  heartsCount?: number;
}

interface ItemsProps {
  data: Product[];
}

const Items: React.FC<ItemsProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <ItemContainer>
      {data.map(({ productId, productName, imgs, price, createdAt, heartsCount }: Product) => (
        <Item key={productId} onClick={() => handleClick(productId)}>
          <ImageContainer>
            <Image src={imgs} alt={productName} />
          </ImageContainer>
          <ItemInfoContainer>
            <ItemName>{productName}</ItemName>
            <ItemInfo>
              <div>
                <Price>{price}</Price>원
              </div>
              <MiniInfos>
                {createdAt && (
                  <MiniInfo>
                    <div>{formatTimeAgo(createdAt)}</div>
                  </MiniInfo>
                )}
                <MiniInfo>
                  <AiOutlineHeart />
                  <span>{heartsCount}</span>
                </MiniInfo>
              </MiniInfos>
            </ItemInfo>
          </ItemInfoContainer>
        </Item>
      ))}
    </ItemContainer>
  );
};

export default Items;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 24%;
  height: 300px;
  margin: 4px;
  border: 1px solid #e0e0e0c4;

  @media (max-width: 1024px) {
    width: 32%;
  }
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

const MiniInfos = styled.div`
  display: flex;
  gap: 10px;
`;

const MiniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
