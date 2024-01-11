import styled from 'styled-components';
import { Heart } from '.';

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

interface MyProductsProps {
  products: Product[];
  sortOption: string;
}

const Hearts = ({ products, sortOption }: MyProductsProps) => {
  return (
    <ItemContainer>
      {products.map(product => {
        return <Heart product={product} key={product.createdAt} sortOption={sortOption} />;
      })}
    </ItemContainer>
  );
};

export default Hearts;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
