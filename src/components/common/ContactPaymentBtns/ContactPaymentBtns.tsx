import { userState } from '../../../recoil/atom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BsSuitHeart, BsSuitHeartFill } from '../../../utils/icons';
import { createMessage } from '../../../api/messages';
import { useAddHeartMutation, useDeleteHeartMutation, useDeleteMyHeartMutation } from '../../../hooks/mutations';

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

interface Btns {
  product: Product;
  sortOption: string;
  isMy: boolean;
}

const ContactPaymentBtns: React.FC<Btns> = ({ product, sortOption, isMy }) => {
  const userId = useRecoilValue(userState) || '';
  const { productId, sellerId, productName, imgs, price, delivery, discount, hearts, createdAt } = product;

  const navigate = useNavigate();
  const [id, setId] = useState('');

  const { mutate: addHeart } = useAddHeartMutation(productId, hearts);
  const { mutate: deleteHeart } = useDeleteHeartMutation(productId, hearts);
  const { mutate: deleteMyHeart } = useDeleteMyHeartMutation(sortOption, id);

  const handleHeartClick = () => {
    if (userId === null) return;

    if (!hearts.includes(userId)) {
      addHeart({ productId: productId, userId: userId });
    } else if (!isMy) {
      deleteHeart({ productId: productId, userId: userId });
    } else {
      setId(productId);
      deleteMyHeart({ productId, userId });
    }
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

  const handleBuyClick = async () => {
    navigate('/buypage', {
      state: {
        img: imgs[0],
        productName: productName,
        price: price,
        createdAt: createdAt,
      },
    });
  };

  return (
    <Buttons isMy={isMy}>
      <HeartBtn onClick={handleHeartClick} aria-label="찜하기" isMy={isMy}>
        {userId && hearts.includes(userId) ? <BsSuitHeartFill /> : <BsSuitHeart />}
      </HeartBtn>
      <TalkBtn disabled={!discount} onClick={() => handleTalkClick()} isMy={isMy}>
        문의하기
      </TalkBtn>
      <BuyBtn aria-label="안전결제" onClick={handleBuyClick} isMy={isMy}>
        안전결제
      </BuyBtn>
    </Buttons>
  );
};

export default ContactPaymentBtns;

const Buttons = styled.div<{ isMy: boolean }>`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  bottom: ${props => !props.isMy && 0};
  gap: ${props => (props.isMy ? '5px' : '10px')};
  position: ${props => (props.isMy ? 'absolute' : 'relative')};
  top: ${props => props.isMy && '235px'};
  right: ${props => props.isMy && 0};
  width: ${props => props.isMy && '100%'};
  font-size: ${props => props.isMy && '16px'};
`;

const HeartBtn = styled.button<{ isMy: boolean }>`
  width: ${props => (props.isMy ? '15%' : '10%')};
  height: ${props => (props.isMy ? '40px' : '8vh')};
  font-size: ${props => (props.isMy ? '16px' : '24px')};
  font-weight: 700;
  border: solid 1px black;
  background-color: white;
`;

const TalkBtn = styled.button<{ isMy: boolean }>`
  width: ${props => (props.isMy ? '35%' : '25%')};
  height: ${props => (props.isMy ? '40px' : '8vh')};
  font-size: ${props => !props.isMy && '18px'};
  border: solid 1px black;
  font-weight: 700;
  background-color: white;
  &:disabled {
    cursor: default;
    border-color: #1010104d;
  }
`;

const BuyBtn = styled.button<{ isMy: boolean }>`
  width: ${props => (props.isMy ? '35%' : '25%')};
  height: ${props => (props.isMy ? '40px' : '8vh')};
  font-size: ${props => !props.isMy && '18px'};
  border: solid 1px #fd7272;
  font-weight: 700;
  background-color: #ff4d24;
  color: white;
`;
