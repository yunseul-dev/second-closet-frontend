import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsSuitHeart, BsSuitHeartFill } from '../../../utils/icons';
import { formatTimeAgo } from '../../../utils';
import { useDeleteMyHeartMutation } from '../../../hooks/mutations';
import { userState } from '../../../recoil/atom';
import { createMessage } from '../../../api/messages';

interface Div {
  $sold: boolean;
}

interface Product {
  productId: number;
  sellerId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  discount: boolean;
  hearts: string[];
  createdAt: number;
  sold: boolean;
}

interface MyHeartProps {
  product: Product;
  sortOption: string;
}

const Heart: React.FC<MyHeartProps> = ({ product, sortOption }) => {
  const { productId, sellerId, productName, imgs, price, delivery, discount, hearts, createdAt, sold } = product;

  const userId = useRecoilValue(userState) || '';
  const navigate = useNavigate();
  const [id, setId] = useState(0);

  const { mutate: deleteHeart } = useDeleteMyHeartMutation(sortOption, id);

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  const handleHeartClick = (productId: number, userId: string) => {
    setId(productId);
    deleteHeart({ productId, userId });
  };

  const handleTalkClick = async () => {
    const { id } = await createMessage({
      productId: productId,
      buyerId: userId,
      sellerId: sellerId,
      productInfo: {
        productName: productName,
        price: price,
        delivery: delivery,
        discount: discount,
        createdAt: createdAt,
        img: imgs[0],
      },
    });

    navigate(`/chatpage/${id}`);
  };

  return (
    <Item key={productId}>
      <ImageContainer onClick={() => handleClick(productId)}>
        <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
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
        <Buttons>
          <HeartBtn onClick={() => handleHeartClick(productId, userId)}>
            <BsSuitHeartFill />
          </HeartBtn>
          <TalkBtn disabled={!discount} onClick={() => handleTalkClick()}>
            문의하기
          </TalkBtn>
          <BuyBtn>구매하기</BuyBtn>
        </Buttons>
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
  &:disabled {
    cursor: default;
    border-color: #1010104d;
  }
`;

const BuyBtn = styled.button`
  width: 35%;
  height: 40px;
  border: solid 1px #fd7272;
  font-weight: 700;
  background-color: #ff4d24;
  color: white;
`;

const HeartBtn = styled.button`
  width: 15%;
  height: 40px;
  border: solid 1px black;
  background-color: white;
  font-size: 16px;
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
