import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '../../../recoil/atom/isLoginState';
import { Category } from '../../../constants';
import { BiCloset, RxDividerVertical, PiSignInBold, AiOutlineMessage, LuUserCog } from '../../../utils/icons';
import { CategoryContainer, Settings, Search } from '.';
import useAuthenticationQuery from '../../../hooks/queries/useAuthenticQuery';

const Header = () => {
  useAuthenticationQuery();
  const isLogin = useRecoilValue(isLoginState);

  const navigate = useNavigate();
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);

  const handleLogoClick = () => navigate('/');
  const handleSigninClick = () => navigate('/signin');
  const handleMessageClick = () => navigate('/chat');
  const handleCreatepostClick = () => navigate('/newproduct');

  const handleCateMouseEnter = () => setIsCategoryHovered(true);
  const handleCateMouseLeave = () => setIsCategoryHovered(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/image/Logo.png';
  }, []);

  return (
    <Container>
      <FirstContainer>
        <Logo>
          <LogoImg src="/assets/image/Logo.png" onClick={handleLogoClick} loading="eager" alt="secondcloset" />
        </Logo>
        <Search />
        {isLogin ? (
          <BtnContainer>
            <Btn onClick={handleMessageClick}>
              <AiOutlineMessage />
              <span>메세지</span>
            </Btn>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <Btn onClick={handleCreatepostClick}>
              <BiCloset />
              <span>상품 등록</span>
            </Btn>
            <Divider>
              <RxDividerVertical />
            </Divider>
            <BtnwithSettings
              onMouseEnter={() => setIsSettingsHovered(true)}
              onMouseLeave={() => setIsSettingsHovered(false)}>
              <LuUserCog />
              <span>설정</span>
              {isSettingsHovered && <Settings />}
            </BtnwithSettings>
          </BtnContainer>
        ) : (
          <Btn onClick={handleSigninClick}>
            <PiSignInBold />
            <div> Sign In</div>
          </Btn>
        )}
      </FirstContainer>
      <div onMouseLeave={handleCateMouseLeave}>
        <CategoryList onMouseEnter={handleCateMouseEnter}>
          {Object.keys(Category).map(category => (
            <CategoryName key={category}>{category}</CategoryName>
          ))}
        </CategoryList>
        {isCategoryHovered && <CategoryContainer />}
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  padding-top: 3%;
  position: fixed;
  top: 0;
  width: 90%;
  max-width: 1240px;
  min-width: 1024px;
  height: 170px;
  z-index: 999;
  border-bottom: 1px solid #d4d4d4;
  background-color: #fff;

  @media (max-width: 1024px) {
    height: 150px;
  }
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
  cursor: pointer;
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

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const CategoryName = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.div`
  border-radius: 5%;
  margin: 0 3px 0 3px;
  padding: 10px 10px 10px 10px;
  font-weight: 700;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  @media (max-width: 1024px) {
    span {
      display: none;
    }

    font-size: 20px;
    gap: 2px;
  }
`;

const BtnwithSettings = styled(Btn)`
  position: relative;
`;
