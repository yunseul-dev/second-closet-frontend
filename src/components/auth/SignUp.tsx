import { styled } from 'styled-components';

const SignUp = () => {
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
      <form>
        <FormWrapper>
          <ContentContainer placeholder="id" />
          <ContentContainer placeholder="password" />
          <ContentContainer placeholder="password confirm" />
          <SubmitBtn type="submit">Sign up</SubmitBtn>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 30%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid #fad4db;
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fad4db;
  padding: 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 300px;
`;

const CombinedSignBtns = styled.div`
  display: flex;
`;

const SignInBtn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: white;
`;

const SignUpBtn = styled.button`
  width: 150px;
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

const ContentContainer = styled.input`
  width: 280px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  border: 1px solid gray;
`;

const SubmitBtn = styled.button`
  width: 280px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-weight: 700;
  border: none;
  padding: 10px;
  border: 1px solid gray;
  background-color: #f1899c;
  color: white;
`;
