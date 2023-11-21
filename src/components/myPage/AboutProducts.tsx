import { useEffect, useState } from 'react';
import MyProducts from './MyProducts/MyProducts';
import MyHearts from './MyHearts/MyHearts';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

interface DivNameProp {
  $clicked: boolean;
}

const AboutProducts = () => {
  const [category, setCategory] = useState('products');
  const queryClient = useQueryClient();

  const handleCategoryClick = (category: string) => setCategory(category);

  useEffect(() => {
    queryClient.refetchQueries();
  }, []);

  return (
    <MyList>
      <ListTab>
        <ListName $clicked={category === 'products'} onClick={() => handleCategoryClick('products')}>
          상품
        </ListName>
        <ListName $clicked={category === 'hearts'} onClick={() => handleCategoryClick('hearts')}>
          찜
        </ListName>
        <ListName $clicked={category === 'reviews'} onClick={() => handleCategoryClick('reviews')}>
          옷장 후기
        </ListName>
        <Empty />
      </ListTab>
      {category === 'products' ? <MyProducts /> : category === 'hearts' ? <MyHearts /> : <></>}
    </MyList>
  );
};

export default AboutProducts;

const MyList = styled.div``;

const ListTab = styled.div`
  display: flex;
`;

const ListName = styled.div<DivNameProp>`
  width: 200px;
  height: 48px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
  font-weight: ${({ $clicked }) => $clicked && '600'};
  border: ${({ $clicked }) => $clicked && '1px solid #000'};
  border-bottom: ${({ $clicked }) => ($clicked ? 'none' : '1px solid #000')};
`;

const Empty = styled.div`
  width: calc(100% - (200px * 3));
  height: 48px;
  border-bottom: 1px solid #000;
`;
