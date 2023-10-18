import { styled } from 'styled-components';
import { BiCategoryAlt } from 'react-icons/bi';
import { LuSunMedium } from 'react-icons/lu';

const Header = () => {
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
        <Btn>
          <IconWrap>
            <LuSunMedium />
          </IconWrap>
        </Btn>
        <Btn>Sign In</Btn>
      </Container>
    </>
  );
};

const Container = styled.header`
  margin-top: 2%;
  display: flex;
  position: absolute;
  top: 0;
  width: 70%;
  z-index: 9999;
  content: space-between;
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

const IconWrap = styled.div`
  svg {
    font-size: 30px;
  }
`;

const SearchBar = styled.form`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 50%;
`;

const Btn = styled.button`
  border-radius: 5%;
  margin: 0 5px 0 5px;
  padding: 10px 20px 10px 20px;
  font-weight: 700;
`;

export default Header;
