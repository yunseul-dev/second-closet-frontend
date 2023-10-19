import { styled } from 'styled-components';

const SignUpAddress = () => {
  return (
    <Container>
      <FlexWrapper>
        <img src="./assets/icons/closetFav.png" alt="Closet Icon" />
        <Title>세컨클로젯</Title>
      </FlexWrapper>
      <CombinedSignBtns>
        <h6>뿌붕님의 가입을 축하드립니다.</h6>
      </CombinedSignBtns>
      <form>
        <FormWrapper>
          <Text>Your address?</Text>
          <ContentContainer placeholder="address" />
          <SubmitButtonGroup>
            <SubmitBtn type="submit">Skip</SubmitBtn>
            <SubmitBtn type="submit">Submit</SubmitBtn>
          </SubmitButtonGroup>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default SignUpAddress;

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
  width: 150px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-weight: 600;
  border: none;
  padding: 10px;
  border: 1px solid gray;
  background-color: #e7e5e5;
`;

const SubmitButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* 버튼 사이 간격 설정 */
`;

const Text = styled.text`
  font-size: 15px;
  margin-bottom: 10px;
`;
