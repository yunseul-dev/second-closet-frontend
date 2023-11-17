import React from 'react';
import styled from 'styled-components';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { Category } from '../../../constants/Category';

interface CategoryTabProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

type DivProps = {
  selected: boolean;
};

const CategoryTab: React.FC<CategoryTabProps> = ({ categories, setCategories }) => {
  const handleFirstCategoryClick = (category: string) => setCategories([category]);
  const handleSecondCategoryClick = (category: string) => setCategories([categories[0], category]);
  const handleThirdCategoryClick = (category: string) => setCategories([categories[0], categories[1], category]);

  return (
    <CategoryTop>
      <CategoryContainer>
        <CategoryBox>
          {Object.keys(Category).map(category => {
            return (
              <CategoryItem
                key={category}
                selected={category === categories[0]}
                onClick={() => handleFirstCategoryClick(category)}>
                {category}
              </CategoryItem>
            );
          })}
        </CategoryBox>
        <CategoryBox>
          {categories[0] &&
            Object.keys(Category[categories[0]]).map((category: string) => {
              return (
                <CategoryItem
                  key={category}
                  selected={category === categories[1]}
                  onClick={() => handleSecondCategoryClick(category)}>
                  {category}
                </CategoryItem>
              );
            })}
        </CategoryBox>
        <CategoryBox>
          {categories[1] &&
            Object.values<string>(Category[categories[0]][categories[1]]).map((category: string) => {
              return (
                <CategoryItem
                  key={category}
                  selected={category === categories[2]}
                  onClick={() => handleThirdCategoryClick(category)}>
                  {category}
                </CategoryItem>
              );
            })}
        </CategoryBox>
      </CategoryContainer>
      <CategoryView>
        <SelectedCategory> 선택한 카테고리: </SelectedCategory>
        {categories.map((category, idx) => {
          return (
            <span key={category}>
              {category}
              {idx < categories.length - 1 && <LiaAngleRightSolid />}
            </span>
          );
        })}
      </CategoryView>
    </CategoryTop>
  );
};

export default CategoryTab;

const CategoryTop = styled.div`
  width: 80%;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
`;

const CategoryBox = styled.div`
  width: 33%;
  height: 30vh;
  border: 1px solid black;
  padding: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d0d0;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a5a5a5;
  }
`;

const CategoryItem = styled.div<DivProps>`
  padding: 10px;
  height: 45px;
  background-color: ${({ selected }) => selected && 'rgba(255, 77, 36, 0.3)'};
  font-weight: ${({ selected }) => selected && '600'};
  text-align: center;
  border-radius: 10px;
`;

const CategoryView = styled.div`
  margin-top: 10px;
  font-weight: 600;
  color: #ff4d24;
`;

const SelectedCategory = styled.span`
  font-weight: 500;
  color: #858383;
`;
