import { styled } from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

interface SignUpOptionProps {
  setState: Dispatch<SetStateAction<string>>;
}

const SignUpOption = ({ setState }: SignUpOptionProps) => {
  const clickSkipBtn = () => setState('signIn');

  return (
    <Container>
      <CombinedSignBtns>
        <Content>
          뿌붕님의 가입을 축하드립니다.
          <br />
          편리한 이용을 위하여 계좌번호와 주소를 입력해주세요.
        </Content>
      </CombinedSignBtns>
      <form>
        <FormWrapper>
          <ContentContainer placeholder="주소 ex) 창원시 성산구 대암로 256 106동 104호" />
          <ContentContainer placeholder="은행 이름 + 계좌번호" />
          <SubmitButtonGroup>
            <SubmitBtn onClick={clickSkipBtn}>Skip</SubmitBtn>
            <SubmitBtn type="submit">Submit</SubmitBtn>
          </SubmitButtonGroup>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default SignUpOption;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Content = styled.div`
  font-size: 14px;
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

  &::placeholder {
    font-size: 12px;
  }
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
