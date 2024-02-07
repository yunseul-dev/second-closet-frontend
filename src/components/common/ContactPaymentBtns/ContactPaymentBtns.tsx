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
    <Buttons $ismy={isMy}>
      <HeartBtn onClick={handleHeartClick} aria-label="찜하기" $ismy={isMy}>
        {userId && hearts.includes(userId) ? <BsSuitHeartFill /> : <BsSuitHeart />}
      </HeartBtn>
      <TalkBtn disabled={!discount} onClick={() => handleTalkClick()} $ismy={isMy}>
        문의하기
      </TalkBtn>
      <BuyBtn aria-label="안전결제" onClick={handleBuyClick} $ismy={isMy}>
        안전결제
      </BuyBtn>
    </Buttons>
  );
};

export default ContactPaymentBtns;

const Buttons = styled.div<{ $ismy: boolean }>`
  width: ${props => props.$ismy && '100%'};
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  bottom: ${props => !props.$ismy && 0};
  gap: ${props => (props.$ismy ? '5px' : '10px')};
  position: ${props => (props.$ismy ? 'absolute' : 'relative')};
  top: ${props => props.$ismy && '235px'};
  right: ${props => props.$ismy && 0};
  font-size: ${props => props.$ismy && '16px'};

  @media (max-width: 1240px) {
    justify-content: space-between;
    margin: 0 20px 0 20px;
  }
`;

const HeartBtn = styled.button<{ $ismy: boolean }>`
  width: ${props => (props.$ismy ? '15%' : '10%')};
  height: ${props => (props.$ismy ? '40px' : '60px')};
  font-size: ${props => (props.$ismy ? '16px' : '24px')};
  font-weight: 700;
  border: solid 1px black;
  background-color: white;

  @media (max-width: 1240px) {
    width: 20%;
    height: 60px;
  }
`;

const TalkBtn = styled.button<{ $ismy: boolean }>`
  width: ${props => (props.$ismy ? '35%' : '25%')};
  height: ${props => (props.$ismy ? '40px' : '60px')};
  font-size: ${props => !props.$ismy && '18px'};
  border: solid 1px black;
  font-weight: 700;
  background-color: white;
  &:disabled {
    cursor: default;
    border-color: #1010104d;
  }

  @media (max-width: 1240px) {
    width: 37%;
    height: 60px;
  }
`;

const BuyBtn = styled.button<{ $ismy: boolean }>`
  width: ${props => (props.$ismy ? '35%' : '25%')};
  height: ${props => (props.$ismy ? '40px' : '60px')};
  font-size: ${props => !props.$ismy && '18px'};
  border: solid 1px #fd7272;
  font-weight: 700;
  background-color: #ff4d24;
  color: white;

  @media (max-width: 1240px) {
    width: 37%;
    height: 60px;
  }
`;
