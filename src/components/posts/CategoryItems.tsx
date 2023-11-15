import styled from 'styled-components';
import { Category } from '../../constants/Category';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useCategoryInfiniteQuery from '../../hooks/queries/useCategoryInfiniteQuery';
import { useCallback, useState, useEffect } from 'react';
import useObserver from '../../hooks/useObserver';
import formatTimeAgo from '../../utils/formatTimeAgo';
import CategoryTab from '../common/CategoryTab';
import { RxDividerVertical } from 'react-icons/rx';
import Loading from '../skeletons/Loading';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  createdAt: number;
}

interface LinkProp {
  $clicked: boolean;
}

interface DivProp {
  $bold: boolean;
}

const CategoryItems = () => {
  const navigate = useNavigate();

  const categoryParams = useParams();
  const categories = Object.values(categoryParams) as string[];
  const [sortOption, setSortOption] = useState<string>('latest');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, hasNextPage, fetchNextPage } = useCategoryInfiniteQuery(categories, sortOption);

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

  const categoryItems =
    categories.length === 1
      ? Object.keys(Category[categories[0]])
      : Object.values(Category[categories[0]][categories[1]]);

  const itemsPerRow = 5;
  const fullItems = [
    '전체보기',
    ...categoryItems,
    ...Array(itemsPerRow - (categoryItems.length % itemsPerRow) - 1).fill(''),
  ];

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  const handleSortClick = (sortOption: string) => setSortOption(sortOption);

  return (
    <Container>
      <CategoryTab categories={categories} />
      <CategoryLists>
        {fullItems.map((category, idx) =>
          category === '' ? (
            <Div key={idx}>{category}</Div>
          ) : (
            <LinkTag
              to={`/category/${categories[0]}/${categories[1] ? categories[1] + '/' : ''}${
                category === '' || category === '전체보기' ? '' : category
              }`}
              key={category + idx}
              $clicked={categories[2] === category || (!categories[2] && category === '전체보기')}>
              <MiniCategory>{category}</MiniCategory>
            </LinkTag>
          ),
        )}
      </CategoryLists>
      <Items>
        <ItemsName>
          <div>
            <SpanTitle>{categories[categories.length - 1]}</SpanTitle>의 전체상품
          </div>
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
        <ItemContainer>
          {data.map(({ productId, productName, imgs, price, createdAt }: Product) => {
            return (
              <Item key={productId} onClick={() => handleClick(productId)}>
                <ImageContainer>
                  <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
                </ImageContainer>
                <ItemInfoContainer>
                  <ItemName>{productName}</ItemName>
                  <ItemInfo>
                    <div>
                      <Price>{price}</Price>원
                    </div>
                    <MiniInfo>
                      <div>{formatTimeAgo(createdAt)}</div>
                    </MiniInfo>
                  </ItemInfo>
                </ItemInfoContainer>
              </Item>
            );
          })}
        </ItemContainer>
        {hasNextPage && (
          <div ref={observerRef}>
            <Loading />
          </div>
        )}
      </Items>
    </Container>
  );
};

export default CategoryItems;

const SpanTitle = styled.span`
  font-weight: 600;
`;

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

const Items = styled.div``;

const ItemsName = styled.div`
  margin: 50px 20px 25px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 23%;
  height: 300px;
  margin: 10px;
  border: 1px solid #e0e0e0c4;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 230px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemInfoContainer = styled.div`
  font-size: 14px;
  height: 60px;
  padding: 10px 20px 10px 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;

const MiniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #888888;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
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
