import styled from 'styled-components';
import { RxDividerVertical } from 'react-icons/rx';
import React from 'react';

interface SortTabsProps {
  setSortOption: (sortOption: string) => void;
  sortOption: string;
  categories: string[];
}

interface DivProp {
  $bold: boolean;
}

const SortTabs: React.FC<SortTabsProps> = ({ setSortOption, sortOption, categories }) => {
  const handleSortClick = (sortOption: string) => setSortOption(sortOption);

  return (
    <ItemsName>
      <CategoryName>
        <SpanTitle>{categories[categories.length - 1]}</SpanTitle>의 전체상품
      </CategoryName>
      <Sort>
        <SortTab onClick={() => handleSortClick('latest')} $bold={sortOption === 'latest'}>
          최신순
        </SortTab>
        <Divider>
          <RxDividerVertical />
        </Divider>
        <SortTab onClick={() => handleSortClick('popular')} $bold={sortOption === 'popular'}>
          인기순
        </SortTab>
        <Divider>
          <RxDividerVertical />
        </Divider>
        <SortTab onClick={() => handleSortClick('highPrice')} $bold={sortOption === 'highPrice'}>
          고가순
        </SortTab>
        <Divider>
          <RxDividerVertical />
        </Divider>
        <SortTab onClick={() => handleSortClick('lowPrice')} $bold={sortOption === 'lowPrice'}>
          저가순
        </SortTab>
      </Sort>
    </ItemsName>
  );
};

export default SortTabs;

const SpanTitle = styled.span`
  font-weight: 600;
`;

const CategoryName = styled.div``;

const ItemsName = styled.div`
  margin: 50px 20px 25px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;

const Sort = styled.div`
  font-size: 16px;
  display: flex;
`;

const SortTab = styled.div<DivProp>`
  font-weight: ${({ $bold }) => $bold && '600'};
`;
