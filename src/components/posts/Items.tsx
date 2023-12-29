import React from 'react';
import styled from 'styled-components';
import { formatTimeAgo } from '../../utils';
import { useNavigate } from 'react-router-dom';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  createdAt: number;
}

interface ItemsProps {
  data: Product[];
}

const Items: React.FC<ItemsProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <ItemContainer>
      {data.map(({ productId, productName, imgs, price, createdAt }: Product) => (
        <Item key={productId} onClick={() => handleClick(productId)}>
          <ImageContainer>
            <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} alt={productName} />
          </ImageContainer>
          <ItemInfoContainer>
            <ItemName>{productName}</ItemName>
            <ItemInfo>
              <div>
                <Price>{price}</Price>원
              </div>
              <MiniInfo>
                <div>{formatTimeAgo(createdAt)}</div>
              </MiniInfo>
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
  width: 23%;
  height: 300px;
  margin: 10px;
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

const MiniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #888888;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
