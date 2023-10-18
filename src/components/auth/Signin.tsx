import { styled } from 'styled-components';

const SignIn = () => {
  return (
    <Container>
      <FlexWrapper>
        <img src="./assets/icons/closetFav.png" alt="Closet Icon" />
        <Title>세컨클로젯</Title>
      </FlexWrapper>
      <CombinedSignBtns>
        <SignBtn>Sign In</SignBtn>
        <SignBtn>Sign Up</SignBtn>
      </CombinedSignBtns>
      <form>
        <FormWrapper>
          <ContentContainer placeholder="id" />
          <ContentContainer placeholder="password" />
          <SubmitBtn type="submit">Sign in</SubmitBtn>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  width: 30%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
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
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CombinedSignBtns = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SignBtn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 500;
  padding: 10px;
`;

const ContentContainer = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  border: 1px solid gray;

  ::placeholder {
    text-align: center; /* 플레이스홀더 텍스트 가운데 정렬 */
  }
`;

const SubmitBtn = styled.button`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  border: 1px solid gray;
`;
