import styled from 'styled-components';
import { TbBasketOff, TbBasket, AiOutlineHeart } from '../../../utils/icons';
import { formatTimeAgo } from '../../../utils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../../../hooks/mutations';
import Modal from '../../common/Modal/Modal';
import { DeleteProductModal, SoldModal } from '.';

interface Product {
  productId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  hearts: number;
  createdAt: string;
  sold: boolean;
}

interface ProductProps {
  product: Product;
  sortOption: string;
}

interface Div {
  $sold: boolean;
}

const Product: React.FC<ProductProps> = ({
  product: { productId, productName, imgs, price, delivery, hearts, createdAt, sold },
  sortOption,
}) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSoldModalOpen, setSoldIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const { mutate: deleteProduct } = useDeleteProductMutation(sortOption, productId);

  const handleDeleteClick = async () => deleteProduct(productId);

  const handleClick = () => navigate(`/product/${productId}`);

  const handleEditClick = () => navigate(`/edit/${productId}`);

  const openSoldModal = () => setSoldIsModalOpen(true);

  const closeSoldModal = () => setSoldIsModalOpen(false);

  return (
    <>
      <Item key={productId}>
        <ImageContainer onClick={handleClick}>
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
            {hearts} <AiOutlineHeart />
          </MiniInfo>
          <Buttons>
            <SoldBtn onClick={openSoldModal} aria-label="판매완료 여부">
              {sold ? <TbBasketOff /> : <TbBasket />}
            </SoldBtn>
            <TalkBtn onClick={handleEditClick} aria-label="수정하기">
              수정하기
            </TalkBtn>
            <BuyBtn onClick={openModal} aria-label="삭제하기">
              삭제하기
            </BuyBtn>
          </Buttons>
        </ItemInfoContainer>
      </Item>
      {isModalOpen && (
        <Modal
          content={<DeleteProductModal closeModal={closeModal} handleDeleteClick={handleDeleteClick} />}
          closeModal={closeModal}
          size="small"
        />
      )}
      {isSoldModalOpen && (
        <Modal
          content={<SoldModal closeModal={closeSoldModal} sold={sold} sortOption={sortOption} productId={productId} />}
          closeModal={closeSoldModal}
          size="small"
        />
      )}
    </>
  );
};

export default Product;

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
  background-color: #ff4d24;
  color: white;
`;

const SoldBtn = styled.button`
  width: 15%;
  height: 40px;
  border: solid 1px black;
  font-weight: 700;
  background-color: white;
  font-size: 20px;
`;
