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
  const handleMessageClick = () => navigate('/chatpage');
  const handleCreatepostClick = () => navigate('/createpost');

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
            <BtnwithSettings
              onMouseEnter={() => setIsSettingsHovered(true)}
              onMouseLeave={() => setIsSettingsHovered(false)}>
              <LuUserCog />
              <div>설정</div>
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
`;

const BtnwithSettings = styled(Btn)`
  position: relative;
`;
