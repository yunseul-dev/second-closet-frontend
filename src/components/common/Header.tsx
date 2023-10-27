import { styled } from 'styled-components';
import { BiCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';

const Header = () => {
  const userId = useRecoilValue(userState);

  const navigate = useNavigate();
  const handleSigninClick = () => {
    navigate('/signin');
  };

  const handleCreatepostClick = () => {
    navigate('/createpost');
  };

  return (
    <>
      <Container>
        <FaBarsWrapper>
          <BiCategoryAlt />
        </FaBarsWrapper>
        <Title>세컨클로젯</Title>
        <SearchBar>
          <Input type="text" placeholder=" 검색어를 입력하세요"></Input>
        </SearchBar>
        {userId ? (
          <>
            <Btn onClick={handleCreatepostClick}>상품 등록</Btn>
            <Btn>나의 옷장</Btn>
          </>
        ) : (
          <Btn onClick={handleSigninClick}>Sign In</Btn>
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
`;

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
  height: 75%;
`;

const Btn = styled.button`
  border-radius: 5%;
  margin: 0 5px 0 5px;
  padding: 10px 20px 10px 20px;
  font-weight: 700;
`;

export default Header;
