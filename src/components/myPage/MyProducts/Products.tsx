import styled from 'styled-components';

import Product from './Product';

interface Products {
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
  products: Products[];
  sortOption: string;
}

const Products = ({ products, sortOption }: MyProductsProps) => {
  return (
    <ItemContainer>
      {products.map((product: Products) => (
        <Product product={product} sortOption={sortOption} />
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
