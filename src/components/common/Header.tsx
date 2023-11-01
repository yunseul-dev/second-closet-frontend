import { styled } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { Category } from '../../constants/Category';
import { useState } from 'react';
import { LuShirt, LuUser2 } from 'react-icons/lu';
import { HiArrowLongRight } from 'react-icons/hi2';
import { BiCloset } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { PiSignInBold } from 'react-icons/pi';
import useRecommendQuery from '../../hooks/queries/useRecommendQuery';

type DivProps = {
  $hovered: boolean;
};

const Header = () => {
  const isLogin = useRecoilValue(isLoginState);

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isItemHovered, setIsItemHovered] = useState<string[]>([]);

  const handleLogoClick = () => navigate('/');

  const handleSigninClick = () => navigate('/signin');

  const handleCreatepostClick = () => navigate('/createpost');

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const handleItemMouseEnter = (category: string[]) => setIsItemHovered(category);
  const handleItemMouseLeave = (category: string[]) => setIsItemHovered(category);

  const { productId, imgs } = useRecommendQuery();

  return (
    <>
      <Container>
        <FirstContainer>
          <FaBarsWrapper onMouseEnter={handleMouseEnter}>
            <LuShirt />
          </FaBarsWrapper>
          <Title onClick={handleLogoClick}>SecondCloset</Title>
          <SearchBar>
            <Input type="text" placeholder="  상품명을 입력하세요"></Input>
          </SearchBar>
          {isLogin ? (
            <BtnContainer>
              <Btn onClick={handleCreatepostClick}>
                <BiCloset />
                <div>상품 등록</div>
              </Btn>
              <Divider>
                <RxDividerVertical />
              </Divider>
              <Btn>
                <LuUser2 />
                <div>My 옷장</div>
              </Btn>
            </BtnContainer>
          ) : (
            <Btn onClick={handleSigninClick}>
              <PiSignInBold />
              <div> Sign In</div>
            </Btn>
          )}
        </FirstContainer>
        <div onMouseLeave={handleMouseLeave}>
          <CategoryContainer onMouseEnter={handleMouseEnter}>
            {Object.keys(Category).map(category => (
              <CategoryName key={category}>{category}</CategoryName>
            ))}
          </CategoryContainer>
          {isHovered && (
            <TabContainer id="categorytab">
              <CategoryTap>
                {Object.keys(Category).map((category: string) => (
                  <CategoryList key={category}>
                    {Object.keys(Category[category]).map((second: string) => (
                      <CategoryItem
                        key={second}
                        onMouseEnter={() => handleItemMouseEnter([category, second])}
                        onMouseLeave={() => handleItemMouseLeave([category, second])}
                        $hovered={isItemHovered[0] === category && isItemHovered[1] === second}>
                        {second}
                      </CategoryItem>
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
          )}
        </div>
      </Container>
    </>
  );
};

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;

const Container = styled.header`
  margin-top: 4%;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9999;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  position: relative;
`;

const FirstContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`;

const CategoryContainer = styled.div`
  width: 75%;
  height: 30px;
  display: flex;
  align-items: center;
`;

const CategoryName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #747373;
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
`;

const TabContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
  background-color: white;
  height: 300px;
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
  height: 50%;
`;

const HeartImg = styled.img`
  width: 100%;
  height: 80%;
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
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: white;
  padding: 5px;
`;
const CategoryItem = styled.div<DivProps>`
  font-size: 14px;
  padding: 5px;
  font-weight: ${({ $hovered }) => $hovered && '600'};
  background-color: ${({ $hovered }) => $hovered && '#ededed'};

  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-family: 'Gaegu';
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
`;

const FaBarsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 38px;
`;

const SearchBar = styled.form`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 85%;
  height: 85%;
  border: 2px solid #fc7b7b;
  border-radius: 20px;
`;

const Btn = styled.div`
  border-radius: 5%;
  margin: 0 5px 0 5px;
  padding: 10px 10px 10px 10px;
  font-weight: 600;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export default Header;
