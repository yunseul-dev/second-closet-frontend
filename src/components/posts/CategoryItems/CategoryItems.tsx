import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useCategoryInfiniteQuery } from '../../../hooks/queries';
import { useObserver } from '../../../hooks';
import CategoryTab from '../../common/CategoryTab/CategoryTab';
import Loading from '../../skeletons/Loading';
import { SortTabs, Items, CategoryList } from '.';

const CategoryItems = () => {
  const categoryParams = useParams();
  const categories = Object.values(categoryParams) as string[];
  const [sortOption, setSortOption] = useState<string>('latest');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { products, hasNextPage, fetchNextPage } = useCategoryInfiniteQuery(categories, sortOption);

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
  const categoryname = categories[categories.length - 1];

  return (
    <Container>
      <CategoryTab categories={categories} />
      <CategoryList categories={categories} />
      <ItemsContainer>
        <SortTabs setSortOption={setSortOption} sortOption={sortOption} name={categoryname} />
        <Items data={products} />
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

const ItemsContainer = styled.div``;
