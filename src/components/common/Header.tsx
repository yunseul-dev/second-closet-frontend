import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import { IoMdShirt } from 'react-icons/io';
import { Category } from '../../constants/Category';
import { useState } from 'react';
import { LuShirt, LuUser2, LuLogIn } from 'react-icons/lu';
import { BiCloset } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { PiSignInBold } from 'react-icons/pi';

type DivProps = {
  $hovered: boolean;
};

const Header = () => {
  const userId = useRecoilValue(userState);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isItemHovered, setIsItemHovered] = useState<string[]>([]);

  const handleSigninClick = () => navigate('/signin');

  const handleCreatepostClick = () => navigate('/createpost');

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const handleItemMouseEnter = (category: string[]) => setIsItemHovered(category);
  const handleItemMouseLeave = (category: string[]) => setIsItemHovered(category);

  return (
    <>
      <Container>
        <FirstContainer>
          <FaBarsWrapper onMouseEnter={handleMouseEnter}>
            <LuShirt />
          </FaBarsWrapper>
          <Title>SecondCloset</Title>
          <SearchBar>
            <Input type="text" placeholder="  상품명을 입력하세요"></Input>
          </SearchBar>
          {userId ? (
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
                <HeartImg src="/assets/image/party.png"></HeartImg>
                <HeartName>상품 보러가기</HeartName>
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

const HeartImg = styled.img`
  width: 60%;
  height: 40%;
`;

const HeartName = styled.div`
  width: 60%;
  height: 10%;
  border: 1px solid #959292;
  font-size: 14px;
  margin-top: 10px;
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
  background-color: ${({ $hovered }) => $hovered && '#fad4db'};
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-family: 'Now';
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 500;
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
  width: 80%;
  height: 80%;
  border: 2px solid #f1899c;
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
