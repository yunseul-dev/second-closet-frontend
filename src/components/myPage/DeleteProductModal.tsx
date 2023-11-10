import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  closeModal: () => void;
  handleDeleteClick: () => void;
}

const DeleteProductModal: React.FC<ModalProps> = ({ closeModal, handleDeleteClick }) => {
  return (
    <Container>
      <Title>게시물 삭제</Title>
      <Content>
        해당 상품이 삭제되며 복구 불가능합니다.
        <br /> 이에 동의하십니까?
      </Content>
      <ButtonContainer>
        <XBtn onClick={closeModal}>아니오</XBtn>
        <OBtn onClick={handleDeleteClick}>예</OBtn>
      </ButtonContainer>
    </Container>
  );
};

export default DeleteProductModal;

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
  margin-top: 10px;
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
