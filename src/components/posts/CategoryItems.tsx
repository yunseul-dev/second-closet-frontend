import styled from 'styled-components';
import { LiaHomeSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { Category } from '../../constants/Category';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useCategoryInfiniteQuery from '../../hooks/queries/useCategoryInfiniteQuery';
import { useCallback } from 'react';
import useObserver from '../../hooks/useObserver';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  createdAt: string;
}

interface DivProp {
  $bold: boolean;
}

const CategoryItems = () => {
  const navigate = useNavigate();

  const categoryParams = useParams();
  const categories = Object.values(categoryParams) as string[];

  const { data, hasNextPage, fetchNextPage } = useCategoryInfiniteQuery(categories);

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const observerRef = useObserver(getNextPage);

  const categoryItems = Object.values(Category[categories[0]][categories[1]]);

  const itemsPerRow = 5;
  const fullItems = [
    '전체보기',
    ...categoryItems,
    ...Array(itemsPerRow - (categoryItems.length % itemsPerRow) - 1).fill(''),
  ];

  const handleClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  const how = (createdAt: string) => {
    let time = '';

    const lastTime = (Date.now() - +createdAt) / 1000 / 60 / 60; // 시

    if (Math.floor(lastTime) > 24) {
      time = `${Math.floor(lastTime / 24)}일 전`; // 날짜
    } else if (Math.floor(lastTime) > 0) {
      time = `${Math.floor(lastTime)}시간 전`; //
    } else if (lastTime * 60 > 0) {
      time = `${Math.floor(lastTime * 60)}분 전`;
    }

    return time;
  };

  return (
    <Container>
      <CategoryTab>
        <LiaHomeSolid />홈
        <LiaAngleRightSolid />
        <Select defaultValue={categories[0]}>
          <option value="">선택</option>
          <option value="여성의류">여성의류</option>
          <option value="남성의류">남성의류</option>
          <option value="가방">가방</option>
          <option value="신발">신발</option>
          <option value="액세서리">액세서리</option>
        </Select>
        <LiaAngleRightSolid />
        <Select defaultValue={categories[1]}>
          <option value="">선택</option>
          {categories[1] &&
            Object.keys(Category[categories[0]]).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </Select>
      </CategoryTab>
      <CategoryLists>
        {fullItems.map((category, idx) =>
          category === '' ? (
            <Div key={idx}>{category}</Div>
          ) : (
            <LinkTag
              to={`/category/${categories[0]}/${categories[1]}/${
                category === '' || category === '전체보기' ? '' : category
              }`}
              key={category + idx}>
              <MiniCategory $bold={categories[2] === category || (!categories[2] && category === '전체보기')}>
                {category}
              </MiniCategory>
            </LinkTag>
          ),
        )}
      </CategoryLists>
      <Items>
        <ItemsName>
          <SpanTitle>{categories[categories.length - 1]}</SpanTitle>의 전체상품
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
                      <div>{how(createdAt)}</div>
                    </MiniInfo>
                  </ItemInfo>
                </ItemInfoContainer>
              </Item>
            );
          })}
        </ItemContainer>
        {hasNextPage && <div ref={observerRef}>Observer</div>}
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

const CategoryTab = styled.div`
  padding: 10px 0 10px 0;
  font-size: small;
  color: #908d8d;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Select = styled.select`
  width: 150px;
  height: 25px;
  border-color: #bbb7b7;
`;

const CategoryLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const LinkTag = styled(Link)`
  width: 20%;
  height: 48px;
  border: 1px solid #e0e0e0;
`;

const Div = styled.div`
  width: 20%;
  height: 48px;
  border: 1px solid #e0e0e0;
`;

const MiniCategory = styled.div<DivProp>`
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ $bold }) => $bold && '600'};
`;

const Items = styled.div``;

const ItemsName = styled.div`
  margin: 50px 0 25px 0;
  font-size: 16px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 22%;
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
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
