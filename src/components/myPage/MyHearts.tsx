import styled from 'styled-components';
import useMyHeartsInfiniteQuery from '../../hooks/queries/useMyHeartsInfiniteQuery';
import useObserver from '../../hooks/useObserver';
import { useState, useCallback, useEffect } from 'react';
import { RxDividerVertical } from 'react-icons/rx';
import Hearts from './Hearts';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';

interface DivProp {
  $bold: boolean;
}

const MyHearts = () => {
  const userId = useRecoilValue(userState);

  const handleOptionClick = (sortOption: string) => setSortOption(sortOption);
  const [sortOption, setSortOption] = useState<string>('all');

  const { products, fetchNextPage, hasNextPage } = useMyHeartsInfiniteQuery(userId.replace(/"/g, ''), sortOption);

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    getNextPage();
  }, [getNextPage]);

  const observerRef = useObserver(getNextPage);

  return (
    <>
      <div>
        <ListCount>
          <div>전체 상품 86</div>
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
      {hasNextPage && <div ref={observerRef}>Observer</div>}
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
