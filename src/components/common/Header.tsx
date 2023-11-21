import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '../../recoil/atom/isLoginState';
import { Category } from '../../constants/Category';
import { useState } from 'react';
import { LuUser2 } from 'react-icons/lu';
import { BiCloset } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { PiSignInBold } from 'react-icons/pi';
import { AiOutlineSearch, AiOutlineMessage } from 'react-icons/ai';
import CategoryContainer from './CategoryContainer';
import useAuthenticationQuery from '../../hooks/queries/useAuthenticQuery';

const Header = () => {
  useAuthenticationQuery();
  const isLogin = useRecoilValue(isLoginState);

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogoClick = () => navigate('/');
  const handleSigninClick = () => navigate('/signin');
  const handleMessageClick = () => navigate('/chatpage');
  const handleCreatepostClick = () => navigate('/createpost');
  const handleMypageClick = () => navigate('/mypage');

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Container>
      <FirstContainer>
        <Logo>
          <LogoImg src="/assets/image/Logo.png" alt="logo" onClick={handleLogoClick}></LogoImg>
        </Logo>
        <SearchBar>
          <Input type="text" placeholder="상품명을 입력하세요." />
          <SearchIcon />
        </SearchBar>
        {isLogin ? (
          <BtnContainer>
            <Btn onClick={handleMessageClick}>
              <AiOutlineMessage />
              <div>메세지</div>
            </Btn>
            <Divider>
              <RxDividerVertical />
            </Divider>
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
  );
};

export default Header;

const Container = styled.header`
  padding-top: 3%;
  position: fixed;
  top: 0;
  width: 1240px;
  height: 170px;
  z-index: 999;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  background-color: #fff;
`;

const FirstContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
`;

const Logo = styled.div`
  margin-left: 20px;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
  display: flex;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  font-size: 20px;
  color: #a1a0a0;
`;

const CategoryList = styled.div`
  width: 75%;
  height: 30px;
  display: flex;
  align-items: center;
`;

const CategoryName = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.form`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  input[type='text']::placeholder {
    color: #ff4d24;
  }
  position: relative;
`;

const Input = styled.input`
  width: 85%;
  height: 85%;
  border: 2px solid #ff4d24;
  border-radius: 10px;
  padding-left: 15px;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 9%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #ff4d24;
`;

const Btn = styled.div`
  border-radius: 5%;
  margin: 0 5px 0 5px;
  padding: 10px 10px 10px 10px;
  font-weight: 700;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
