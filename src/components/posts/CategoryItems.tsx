import styled from 'styled-components';
import { LiaHomeSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { Category } from '../../constants/Category';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryInfiniteQuery from '../../hooks/queries/useCategoryInfiniteQuery';
import { useCallback } from 'react';
import useObserver from '../../hooks/useObserver';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  createdAt: string;
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
        {fullItems.map((category, idx) => (
          <MiniCategory key={category + idx}>{category}</MiniCategory>
        ))}
      </CategoryLists>
      <Items>
        <ItemsName>아우터의 전체상품</ItemsName>
        <ItemContainer>
          {data?.pages.flat().map(({ productId, productName, imgs, createdAt }: Product) => {
            return (
              <Item key={productId} onClick={() => handleClick(productId)}>
                <ImageContainer>
                  <Image src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
                </ImageContainer>
                <ItemInfoContainer>
                  <ItemName>{productName}</ItemName>
                  <ItemInfo>
                    <MiniInfo>
                      <div>{createdAt}</div>
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

const MiniCategory = styled.div`
  width: 20%;
  height: 48px;
  font-size: 12px;
  border: 1px solid #e0e0e0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
