import { useCallback, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { usePopularInfiniteQuery } from '../../hooks/queries';
import { useObserver } from '../../hooks';
import { BsBalloonHeartFill } from '../../utils/icons';
import Loading from '../skeletons/Loading';
import Banner from './Banner';
import Items from '../common/Items/Items';
import { useQueryClient } from '@tanstack/react-query';

const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { products, hasNextPage, fetchNextPage } = usePopularInfiniteQuery();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.refetchQueries();
  }, []);

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
    <>
      <Banner />
      <Title>
        오늘의 인기 상품 <BsBalloonHeartFill />
      </Title>
      <Items data={products} />
      {hasNextPage && (
        <div ref={observerRef}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Main;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0;
  color: #ff4d24;
  display: flex;
  align-items: center;
`;
