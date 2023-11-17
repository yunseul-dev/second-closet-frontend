import React from 'react';
import styled from 'styled-components';

interface ButtonsProps {
  handleSubmit: () => void;
  handleImsiSubmit: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ handleSubmit, handleImsiSubmit }) => {
  return (
    <Container>
      <ImsiBtn onClick={handleImsiSubmit}>임시저장</ImsiBtn>
      <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
    </Container>
  );
};

export default Buttons;

const Container = styled.div`
  position: sticky;
  background-color: white;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #d4d4d4;
  padding-top: 20px;
`;

const SubmitBtn = styled.button`
  width: 15%;
  height: 55px;
  font-size: 20px;
  font-weight: 600;
  background-color: #ff4d24;
  color: white;
`;

const ImsiBtn = styled.button`
  width: 15%;
  height: 55px;
  border: 1px solid gray;
  font-size: 20px;
  font-weight: 600;
  background-color: white;
`;
