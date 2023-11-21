import styled from 'styled-components';
import Heart from './Heart';

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
