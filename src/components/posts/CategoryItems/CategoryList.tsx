import styled from 'styled-components';
import { Category } from '../../../constants/Category';
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryListProps {
  categories: string[];
}

interface LinkProp {
  $clicked: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const categoryItems =
    categories.length === 1
      ? Object.keys(Category[categories[0]])
      : Object.values(Category[categories[0]][categories[1]]);

  const itemsPerRow = 5;
  const fullItems = [
    '전체보기',
    ...categoryItems,
    ...Array(itemsPerRow - (categoryItems.length % itemsPerRow) - 1).fill(''),
  ];

  return (
    <CategoryLists>
      {fullItems.map((category, idx) =>
        category === '' ? (
          <Div key={idx}>{category}</Div>
        ) : (
          <LinkTag
            to={`/category/${categories[0]}/${categories[1] ? categories[1] + '/' : ''}${
              category === '' || category === '전체보기' ? '' : category
            }`}
            key={category + idx}
            $clicked={categories[2] === category || (!categories[2] && category === '전체보기')}>
            <MiniCategory>{category}</MiniCategory>
          </LinkTag>
        ),
      )}
    </CategoryLists>
  );
};

export default CategoryList;

const CategoryLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const LinkTag = styled(Link)<LinkProp>`
  width: 20%;
  height: 48px;
  border: 1px solid #e0e0e0;
  background-color: ${({ $clicked }) => $clicked && '#ff4d24'};
  color: ${({ $clicked }) => $clicked && '#fff'};
  font-weight: ${({ $clicked }) => $clicked && '700'};
`;

const Div = styled.div`
  width: 20%;
  height: 48px;
  border: 1px solid #e0e0e0;
`;

const MiniCategory = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
