import { styled } from 'styled-components';
import { RiShirtFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import { IoMdShirt } from 'react-icons/io';
import { Category } from '../../constants/Category';
import { useState, useRef } from 'react';

const Header = () => {
  const userId = useRecoilValue(userState);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleSigninClick = () => {
    navigate('/signin');
  };

  const handleCreatepostClick = () => {
    navigate('/createpost');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCategories([]);
  };

  const handleFirstCategoryEnter = (category: string) => {
    setCategories([category]);
  };

  const handleSecondCategoryEnter = (category: string) => {
    setCategories([categories[0], category]);
  };

  return (
    <>
      <Container>
        <FaBarsWrapper onMouseEnter={handleMouseEnter}>
          <IoMdShirt />
        </FaBarsWrapper>
        <Title>SecondCloset</Title>
        <SearchBar>
          <Input type="text" placeholder="  상품명을 입력하세요"></Input>
        </SearchBar>
        {userId ? (
          <>
            <Btn onClick={handleCreatepostClick}>상품 등록</Btn>
            <Btn>나의 옷장</Btn>
          </>
        ) : (
          <Btn onClick={handleSigninClick}>Sign In</Btn>
        )}
        {isHovered && (
          <CategoryContainer ref={categoryRef} onMouseLeave={handleMouseLeave}>
            <CategoryList>
              <CategoryName>전체 카테고리</CategoryName>
              {Object.keys(Category).map(category => {
                return <CategoryItem onMouseEnter={() => handleFirstCategoryEnter(category)}>{category}</CategoryItem>;
              })}
            </CategoryList>
            {categories[0] && (
              <CategoryList>
                <CategoryName>{categories[0]}</CategoryName>
                {Object.keys(Category[categories[0]]).map(category => {
                  return (
                    <CategoryItem onMouseEnter={() => handleSecondCategoryEnter(category)}>{category}</CategoryItem>
                  );
                })}
              </CategoryList>
            )}
            {categories[1] && Category[categories[0]][categories[1]].length > 0 && (
              <CategoryList>
                <CategoryName>{categories[1]}</CategoryName>
                {Object.values(Category[categories[0]][categories[1]]).map(category => {
                  return <CategoryItem>{category}</CategoryItem>;
                })}
              </CategoryList>
            )}
          </CategoryContainer>
        )}
      </Container>
    </>
  );
};

const Container = styled.header`
  margin-top: 4%;
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9999;
  padding-bottom: 20px;
  border-bottom: 1px solid #d4d4d4;
  position: relative;
`;

const CategoryContainer = styled.div`
  position: absolute;
  top: 100%; /* 아이콘 아래에 위치 */
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;

  /* width: 20%;
  height: 400px;
  border-top: 1px solid #d4d4d4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const CategoryList = styled.div`
  width: 20%;
  height: 500px;
  border-top: 1px solid #d4d4d4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  background-color: white;
`;
const CategoryItem = styled.div``;

const Title = styled.h4`
  font-family: 'Hi melody';
  display: flex;
  align-items: center;
`;

const FaBarsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const SearchBar = styled.form`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  height: 80%;
  border: 2px solid #f1899c;
  border-radius: 20px;
`;

const Btn = styled.button`
  border-radius: 5%;
  margin: 0 5px 0 5px;
  padding: 10px 20px 10px 20px;
  font-weight: 700;
  background-color: #fccbd4;
`;

export default Header;
