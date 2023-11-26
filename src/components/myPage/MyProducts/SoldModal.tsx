import React from 'react';
import styled from 'styled-components';
import { useDeleteSoldMutation, useAddSoldMutation } from '../../../hooks/mutations';

interface SoldModalProps {
  closeModal: () => void;
  sold: boolean;
  sortOption: string;
  productId: number;
}

const SoldModal: React.FC<SoldModalProps> = ({ closeModal, sold, sortOption, productId }) => {
  const { mutate: deleteSold } = useDeleteSoldMutation(sortOption, productId);
  const { mutate: addSold } = useAddSoldMutation(sortOption, productId);

  const handleClickXBtn = () => {
    if (sold === false) return closeModal();

    deleteSold(productId);
    closeModal();
  };

  const handleClickOBtn = () => {
    if (sold === true) return closeModal();

    addSold(productId);
    closeModal();
  };

  return (
    <Container>
      <Title>판매 상태 확인</Title>
      <Content>해당 상품이 판매되었나요?</Content>
      <ButtonContainer>
        <XBtn onClick={handleClickXBtn}>아니오</XBtn>
        <OBtn onClick={handleClickOBtn}>예</OBtn>
      </ButtonContainer>
    </Container>
  );
};

export default SoldModal;

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
  background-color: #ff4d24;
  border: solid 1px #fe4218;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;
