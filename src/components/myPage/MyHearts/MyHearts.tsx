import styled from 'styled-components';
import useMyHeartsInfiniteQuery from '../../../hooks/queries/useMyHeartsInfiniteQuery';
import useObserver from '../../../hooks/useObserver';
import { useState, useCallback, useEffect } from 'react';
import { RxDividerVertical } from 'react-icons/rx';
import Hearts from './Hearts';
import Loading from '../../skeletons/Loading';

interface DivProp {
  $bold: boolean;
}

const MyHearts = () => {
  const handleOptionClick = (sortOption: string) => setSortOption(sortOption);
  const [sortOption, setSortOption] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { products, fetchNextPage, hasNextPage } = useMyHeartsInfiniteQuery(sortOption);

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
      <div>
        <ListCount>
          <div></div>
          <Sort>
            <SortTab $bold={sortOption === 'all'} onClick={() => handleOptionClick('all')}>
              전체
            </SortTab>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <SortTab $bold={sortOption === 'notSold'} onClick={() => handleOptionClick('notSold')}>
              판매중
            </SortTab>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <SortTab $bold={sortOption === 'sold'} onClick={() => handleOptionClick('sold')}>
              판매완료
            </SortTab>
          </Sort>
        </ListCount>
      </div>
      <Hearts products={products} sortOption={sortOption} />
      {hasNextPage && (
        <div ref={observerRef}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default MyHearts;

const ListCount = styled.div`
  font-size: 18px;
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;
`;

const Sort = styled.div`
  display: flex;
  margin-right: 20px;
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;

const SortTab = styled.div<DivProp>`
  font-weight: ${({ $bold }) => $bold && '600'};
  font-size: 14px;
`;
