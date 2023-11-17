import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { HiArrowLongRight } from 'react-icons/hi2';
import useRecommendQuery from '../../hooks/queries/useRecommendQuery';
import { useState } from 'react';
import { Category } from '../../constants/Category';

type DivProps = {
  $hovered: boolean;
};

const CategoryContainer = () => {
  const [isItemHovered, setIsItemHovered] = useState<string[]>([]);

  const handleItemMouseEnter = (category: string[]) => setIsItemHovered(category);
  const handleItemMouseLeave = (category: string[]) => setIsItemHovered(category);

  const { productId, imgs } = useRecommendQuery();

  return (
    <TabContainer id="categorytab">
      <CategoryTap>
        {Object.keys(Category).map((category: string) => (
          <CategoryList key={category}>
            {Object.keys(Category[category]).map((second: string) => (
              <LinkCategoryTag key={second} to={`/category/${category}/${second}`}>
                <CategoryItem
                  onMouseEnter={() => handleItemMouseEnter([category, second])}
                  onMouseLeave={() => handleItemMouseLeave([category, second])}
                  $hovered={isItemHovered[0] === category && isItemHovered[1] === second}>
                  {second}
                </CategoryItem>
              </LinkCategoryTag>
            ))}
          </CategoryList>
        ))}
      </CategoryTap>
      <ManyHeart>
        <LinkTag to={`/detail/${productId}`}>
          <HeartImg src={`http://localhost:5023/api/products/uploads/${imgs[0]}`} />
          <HeartName>
            <div>상품 보러가기</div>
            <HiArrowLongRight />
          </HeartName>
        </LinkTag>
      </ManyHeart>
    </TabContainer>
  );
};

export default CategoryContainer;

const TabContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  background-color: white;
  height: 280px;
  position: absolute;
  display: flex;
`;

const ManyHeart = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkTag = styled(Link)`
  display: block;
  width: 60%;
  height: 60%;
`;

const HeartImg = styled.img`
  width: 100%;
  height: 80%;
`;

const LinkCategoryTag = styled(Link)`
  width: 100%;
`;

const HeartName = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid #c0bebe;
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  padding: 0 10px 0 10px;
  justify-content: space-between;
  align-items: center;
`;

const CategoryTap = styled.div`
  width: 75%;
  height: 100%;
  top: 100%;
  left: 0;
  display: flex;
`;

const CategoryList = styled.div`
  width: 20%;
  border: 1px solid #dfdfdf;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  background-color: white;
  padding: 5px;
  padding-top: 20px;
`;
const CategoryItem = styled.div<DivProps>`
  font-size: 14px;
  padding: 5px;
  font-weight: ${({ $hovered }) => $hovered && '600'};
  background-color: ${({ $hovered }) => $hovered && '#ededed'};
  border-radius: 10px;
  display: flex;
  justify-content: center;
`;
