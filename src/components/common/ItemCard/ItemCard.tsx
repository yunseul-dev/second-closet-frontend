import styled from 'styled-components';
import { formatTimeAgo } from '../../../utils';

interface ProductInfo {
  img: string;
  productName: string;
  price: string;
  createdAt: string;
}

const ItemCard: React.FC<{ productInfo: ProductInfo; size: string }> = ({ productInfo, size }) => {
  return (
    <Item size={size}>
      <ImageContainer>
        <Image src={productInfo.img} alt={productInfo.productName} />
      </ImageContainer>
      <ItemInfoContainer>
        <ItemName>{productInfo.productName}</ItemName>
        <ItemInfo>
          <div>
            <Price>{productInfo.price}</Price>원
          </div>
          <MiniInfo>
            <div>{formatTimeAgo(productInfo.createdAt)}</div>
          </MiniInfo>
        </ItemInfo>
      </ItemInfoContainer>
    </Item>
  );
};

export default ItemCard;

const Item = styled.div<{ size: string }>`
  width: ${props => `${props.size}%`};
  height: 250px;
  margin: 10px;
  border: 1px solid #e0e0e0c4;
  background-color: #fff;
  color: #000;
  display: flex;
  padding: 15px;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 220px;
  border: 1px solid #e0e0e0c4;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemInfoContainer = styled.div`
  width: 50%;
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
