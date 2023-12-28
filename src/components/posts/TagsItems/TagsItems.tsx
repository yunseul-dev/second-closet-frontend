import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTagsInfiniteQuery } from '../../../hooks/queries';
import { useObserver } from '../../../hooks';
import Loading from '../../skeletons/Loading';
import SortTabs from '../SortTabs';
import Items from '../Items';

const TagsItems = () => {
  const { tagname } = useParams();

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
        <SortTabs setSortOption={setSortOption} sortOption={sortOption} name={tagname} />
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

export default TagsItems;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const ItemsContainer = styled.div``;
