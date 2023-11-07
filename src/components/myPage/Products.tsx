import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import formatTimeAgo from '../../utils/formatTimeAgo';
import { useNavigate } from 'react-router-dom';

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
}

const Products = ({ products }: MyProductsProps) => {
  const navigate = useNavigate();

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <ItemContainer>
      {products.map(({ productId, productName, imgs, price, delivery, hearts, createdAt }: Product) => {
        return (
          <Item key={productId}>
            <ImageContainer onClick={() => handleClick(productId)}>
              <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
            </ImageContainer>
            <ItemInfoContainer>
              <div>
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
              </div>
              <Edit>
                <EditBtn>수정</EditBtn>
              </Edit>
            </ItemInfoContainer>
          </Item>
        );
      })}
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  margin-left: auto;
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const EditBtn = styled.button`
  background-color: white;
  height: 40px;
  width: 35%;
  border: solid 1px black;
`;