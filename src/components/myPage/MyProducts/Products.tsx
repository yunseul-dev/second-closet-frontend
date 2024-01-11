import styled from 'styled-components';
import { Product } from '.';

interface Products {
  productId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  hearts: number;
  createdAt: string;
  sold: boolean;
}

interface MyProductsProps {
  products: Products[];
  sortOption: string;
}

const Products = ({ products, sortOption }: MyProductsProps) => {
  return (
    <ItemContainer>
      {products.map((product: Products) => (
        <Product product={product} sortOption={sortOption} key={product.productId} />
      ))}
    </ItemContainer>
  );
};

export default Products;
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
