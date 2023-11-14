import styled from 'styled-components';

interface ModalProps {
  closeModal: () => void;
}

const PwEditModal: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Content>
        <InfoContainer>
          <Label>현재 비밀번호</Label>
          <Input type="password" />
        </InfoContainer>
        <InfoContainer>
          <Label>새 비밀번호</Label>
          <Input type="password" />
        </InfoContainer>
        <InfoContainer>
          <Label>새 비밀번호 확인</Label>
          <Input type="password" />
        </InfoContainer>
      </Content>
      <ButtonContainer>
        <XBtn onClick={closeModal}>돌아가기</XBtn>
        <OBtn>변경</OBtn>
      </ButtonContainer>
    </Container>
  );
};

export default PwEditModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.div`
  font-size: 16px;
  margin-top: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 5px 0 5px 0;
`;

const Label = styled.div`
  width: 30%;
`;

const Input = styled.input`
  width: 65%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  right: 0;
  position: absolute;
`;

const Button = styled.button`
  margin-left: 10px;
  border: 1px solid;
  padding: 10px;
`;

const OBtn = styled(Button)`
  background-color: #f98181;
  border: solid 1px #fd7272;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;
