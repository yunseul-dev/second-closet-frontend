import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsSuitHeart } from '../../../utils/icons';
import { formatTimeAgo } from '../../../utils';
import ContactPaymentBtns from '../../common/ContactPaymentBtns/ContactPaymentBtns';

interface Div {
  $sold: boolean;
}

interface Product {
  productId: string;
  sellerId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  discount: boolean;
  hearts: string[];
  createdAt: string;
  sold: boolean;
}

interface MyHeartProps {
  product: Product;
  sortOption: string;
}

const Heart: React.FC<MyHeartProps> = ({ product, sortOption }) => {
  const { productId, productName, imgs, price, delivery, hearts, createdAt, sold } = product;

  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Item key={productId}>
      <ImageContainer onClick={() => handleClick(productId)}>
        <Image src={imgs[0]} alt={productName} />
        <Overlay $sold={sold}>
          <Circle>판매완료</Circle>
        </Overlay>
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
          {hearts.length} <BsSuitHeart />
        </MiniInfo>
        <ContactPaymentBtns product={product} sortOption={sortOption} isMy={true} />
      </ItemInfoContainer>
    </Item>
  );
};

export default Heart;

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
  position: relative;
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

const Overlay = styled.div<Div>`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ $sold }) => ($sold ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  color: white;
  width: 80px;
  height: 80px;
  border: 2px solid #fff;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
