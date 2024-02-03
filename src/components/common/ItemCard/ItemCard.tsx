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
      <ItemInfoContainer size={size}>
        <ItemName>{productInfo.productName}</ItemName>
        <ItemInfo>
          <div>
            <Price size={size}>{productInfo.price}</Price>원
          </div>
          <MiniInfo size={size}>
            <div>{formatTimeAgo(productInfo.createdAt)}</div>
          </MiniInfo>
        </ItemInfo>
      </ItemInfoContainer>
    </Item>
  );
};

export default ItemCard;

const Item = styled.div<{ size: string }>`
  width: ${props => `${props.size === 'small' ? 70 : 100}%`};
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

const ItemInfoContainer = styled.div<{ size: string }>`
  width: 50%;
  font-size: ${props => `${props.size === 'small' ? 14 : 18}px`};
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;

const MiniInfo = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${props => `${props.size === 'small' ? 12 : 14}px`};
  color: #888888;
`;

const Price = styled.span<{ size: string }>`
  font-size: ${props => `${props.size === 'small' ? 16 : 20}px`};
  font-weight: 600;
`;
