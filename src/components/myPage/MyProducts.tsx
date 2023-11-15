import styled from 'styled-components';
import useObserver from '../../hooks/useObserver';
import { useState, useCallback, useEffect } from 'react';
import useMyProductInfiiteQuery from '../../hooks/queries/useMyProductInfiniteQuery';
import { RxDividerVertical } from 'react-icons/rx';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import Products from './Products';

interface DivProp {
  $bold: boolean;
}

const MyProducts = () => {
  const [sortOption, setSortOption] = useState<string>('all');

  const userId = useRecoilValue(userState);

  const { products, hasNextPage, fetchNextPage } = useMyProductInfiiteQuery(userId.replace(/"/g, ''), sortOption);

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

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
      <Products products={products} sortOption={sortOption} />
      {hasNextPage && <div ref={observerRef}>마지막 상품입니다.</div>}
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
