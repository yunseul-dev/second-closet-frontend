import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import useCategoryInfiniteQuery from '../../../hooks/queries/useCategoryInfiniteQuery';
import { useCallback, useState, useEffect } from 'react';
import useObserver from '../../../hooks/useObserver';
import CategoryTab from '../../common/CategoryTab';
import Loading from '../../skeletons/Loading';
import SortTabs from './SortTabs';
import Items from './Items';
import CategoryList from './CategoryList';

interface LinkProp {
  $clicked: boolean;
}

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  createdAt: number;
}

const CategoryItems = () => {
  const categoryParams = useParams();
  const categories = Object.values(categoryParams) as string[];
  const [sortOption, setSortOption] = useState<string>('latest');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, hasNextPage, fetchNextPage } = useCategoryInfiniteQuery(categories, sortOption) as {
    data: Product[];
    hasNextPage: boolean;
    fetchNextPage: () => void;
  };

  const getNextPage = useCallback(() => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);
    fetchNextPage();
    setIsLoading(false);
  }, [fetchNextPage, isLoading, hasNextPage]);

  useEffect(() => {
    getNextPage();
  }, [getNextPage]);

  const observerRef = useObserver(getNextPage);

  return (
    <Container>
      <CategoryTab categories={categories} />
      <CategoryList categories={categories} />
      <ItemsContainer>
        <SortTabs setSortOption={setSortOption} sortOption={sortOption} categories={categories} />
        <Items data={data} />
        {hasNextPage && (
          <div ref={observerRef}>
            <Loading />
          </div>
        )}
      </ItemsContainer>
    </Container>
  );
};

export default CategoryItems;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const CategoryLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const LinkTag = styled(Link)<LinkProp>`
  width: 20%;
  height: 48px;
  border: 1px solid #e0e0e0;
  background-color: ${({ $clicked }) => $clicked && '#fee4e4'};
  font-weight: ${({ $clicked }) => $clicked && '600'};
`;

const Div = styled.div`
  width: 20%;
  height: 48px;
  border: 1px solid #e0e0e0;
`;

const MiniCategory = styled.div`
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsContainer = styled.div``;
