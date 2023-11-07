import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { Category } from '../../constants/Category';
import { useState } from 'react';
import { LuShirt, LuUser2 } from 'react-icons/lu';
import { BiCloset } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { PiSignInBold } from 'react-icons/pi';
import CategoryContainer from './CategoryContainer';
import useAuthenticationQuery from '../../hooks/queries/useAuthenticQuery';

const Header = () => {
  const isLogin = useAuthenticationQuery();
  // const isLogin = useRecoilValue(isLoginState);

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogoClick = () => navigate('/');
  const handleSigninClick = () => navigate('/signin');
  const handleCreatepostClick = () => navigate('/createpost');
  const handleMypageClick = () => navigate('/mypage');

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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
              <Btn onClick={handleMypageClick}>
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
          <CategoryList onMouseEnter={handleMouseEnter}>
            {Object.keys(Category).map(category => (
              <CategoryName key={category}>{category}</CategoryName>
            ))}
          </CategoryList>
          {isHovered && <CategoryContainer />}
        </div>
      </Container>
    </>
  );
};

export default Header;

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

const CategoryList = styled.div`
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
