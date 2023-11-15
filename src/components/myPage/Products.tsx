import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import formatTimeAgo from '../../utils/formatTimeAgo';
import { useNavigate } from 'react-router-dom';
import useDeleteProductMutation from '../../hooks/mutations/useDeleteProductMutation';
import Modal from '../common/Modal';
import DeleteProductModal from './DeleteProductModal';
import { useState } from 'react';
import { BsCartCheck, BsCartCheckFill } from 'react-icons/bs';

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

interface MyProductsProps {
  products: Product[];
  sortOption: string;
}

interface Div {
  $sold: boolean;
}

const Products = ({ products, sortOption }: MyProductsProps) => {
  const navigate = useNavigate();

  console.log('here! ', products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<undefined | number>(undefined);

  const openModal = (productId: number) => {
    setDeleteId(productId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const { mutate: deleteProduct } = useDeleteProductMutation(sortOption, products.productId);

  const handleClick = (productId: number) => navigate(`/detail/${productId}`);

  const handleEditClick = (productId: number) => navigate(`/editpost/${productId}`);

  const handleDeleteClick = async (productId: number) => deleteProduct(productId);

  return (
    <ItemContainer>
      {products.map(({ productId, productName, imgs, price, delivery, hearts, createdAt, sold }: Product) => {
        return (
          <Item key={productId}>
            <ImageContainer onClick={() => handleClick(productId)} $sold={sold}>
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
              <Buttons>
                <HeartBtn>{sold && <BsCartCheck />}</HeartBtn>
                <TalkBtn onClick={() => handleEditClick(productId)}>수정하기</TalkBtn>
                <BuyBtn onClick={() => openModal(productId)}>삭제하기</BuyBtn>
              </Buttons>
            </ItemInfoContainer>
          </Item>
        );
      })}
      {isModalOpen && (
        <Modal
          content={<DeleteProductModal closeModal={closeModal} handleDeleteClick={() => handleDeleteClick(deleteId)} />}
          closeModal={closeModal}
          size="small"
        />
      )}
    </ItemContainer>
  );
};

export default Products;
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

const ImageContainer = styled.div<Div>`
  width: 45%;
  height: 100%;
  position: relative;

  /* sold === true일 때, 투명한 레이어를 적용 */
  ::after {
    content: '';
    display: ${({ $sold }) => ($sold ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
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
  font-size: 20px;
`;
