import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTagsInfiniteQuery } from '../../../hooks/queries';
import { useObserver } from '../../../hooks';
import Loading from '../../skeletons/Loading';
import SortTabs from '../SortTabs';
import Items from '../../common/Items/Items';
import { useLocation } from 'react-router-dom';

const TagsItems = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tagname = params.get('searchTerm') || '';

  const [sortOption, setSortOption] = useState<string>('latest');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { products, hasNextPage, fetchNextPage } = useTagsInfiniteQuery(tagname, sortOption);

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
      <ItemsContainer>
        {products.length > 0 ? (
          <>
            <SortTabs setSortOption={setSortOption} sortOption={sortOption} name={tagname} />
            <Items data={products} />
            {hasNextPage && (
              <div ref={observerRef}>
                <Loading />
              </div>
            )}
          </>
        ) : (
          <ItemsName>
            <CategoryName>
              <SpanTitle>"{tagname}"</SpanTitle>에 대한 상품이 존재하지 않습니다.
            </CategoryName>
          </ItemsName>
        )}
      </ItemsContainer>
    </Container>
  );
};

export default TagsItems;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const ItemsContainer = styled.div``;

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
