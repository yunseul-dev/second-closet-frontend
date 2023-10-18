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
          {/* <ContentContainer placeholder="address" /> */}
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
`;

const CombinedSignBtns = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SignInBtn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 600;
  padding: 10px;
  background-color: #e7e5e5;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const SignUpBtn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: #e7e5e5;
  color: #f1899c;

  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 10px;

  position: relative; /* 위치 지정을 위해 상대적 위치 설정 */

  &::after {
    content: '';
    position: absolute;
    bottom: 4px; /* 밑줄과 컨텐트 사이 간격 조절  */
    left: 15%; /* 왼쪽 여백 */
    right: 15%; /* 오른쪽 여백  */
    height: 3px; /* 밑줄 두께  */

    background-color: #f1899c;
  }
`;

const ContentContainer = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  border: 1px solid gray;
`;

const SubmitBtn = styled.button`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-weight: 600;
  border: none;
  padding: 10px;
  border: 1px solid gray;
  background-color: #e7e5e5;
`;
