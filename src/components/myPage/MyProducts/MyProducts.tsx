import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { useMyProductInfiniteQuery } from '../../../hooks/queries';
import { useObserver } from '../../../hooks';
import { RxDividerVertical } from '../../../utils/icons';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/atom';
import { Products } from '.';
import Loading from '../../skeletons/Loading';

interface DivProp {
  $bold: boolean;
}

const MyProducts = () => {
  const [sortOption, setSortOption] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = useRecoilValue(userState) || '';

  const { products, hasNextPage, fetchNextPage } = useMyProductInfiniteQuery(userId.replace(/"/g, ''), sortOption);

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

  const handleOptionClick = (sortOption: string) => setSortOption(sortOption);

  return (
    <>
      <div>
        <ListCount>
          <div></div>
          <Sort>
            <SortTab $bold={sortOption === 'all'} onClick={() => handleOptionClick('all')} aria-label="전체">
              전체
            </SortTab>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <SortTab $bold={sortOption === 'notSold'} onClick={() => handleOptionClick('notSold')} aria-label="판매중">
              판매중
            </SortTab>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <SortTab $bold={sortOption === 'sold'} onClick={() => handleOptionClick('sold')} aria-label="판매완료">
              판매완료
            </SortTab>
          </Sort>
        </ListCount>
      </div>
      <Products products={products} sortOption={sortOption} />
      {hasNextPage && (
        <div ref={observerRef}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default MyProducts;

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
