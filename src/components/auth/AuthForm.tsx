import { styled } from 'styled-components';

const AuthForm = () => {
  return (
    <Container>
      <FlexWrapper>
        <img src="./assets/icons/closetFav.png" alt="Closet Icon" />
        <Title>세컨클로젯</Title>
      </FlexWrapper>
      <CombinedSignBtns>
        <SignInBtn>Sign In</SignInBtn>
        <SignUpBtn>Sign Up</SignUpBtn>
      </CombinedSignBtns>
    </Container>
  );
};

export default AuthForm;

const Container = styled.div`
  min-width: 420px;
  min-height: 500px;
  width: 25%;
  height: 56vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #fad4db;
  border-radius: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-family: 'Hi melody';
  text-align: center;
  margin-left: 10px;
`;

const CombinedSignBtns = styled.div`
  display: flex;
`;

const SignInBtn = styled.button`
  width: 180px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: white;
  font-size: 16px;
`;

const SignUpBtn = styled.button`
  font-size: 16px;
  width: 180px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: #fad4db;
  color: #f1899c;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding-left: 10px;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 30%;
    right: 30%;
    height: 3px;

    background-color: #f1899c;
  }
`;
