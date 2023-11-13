import React from 'react';
import styled from 'styled-components';
import { FaXmark } from 'react-icons/fa6';

interface ModalProps {
  content: React.ReactNode;
  closeModal: () => void;
  size: string;
}

const Modal: React.FC<ModalProps> = ({ content, closeModal, size }) => (
  <Container>
    <ModalInner size={size}>
      <XBtn onClick={closeModal}>
        <FaXmark />
      </XBtn>
      {content}
    </ModalInner>
  </Container>
);

export default Modal;

const Container = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalInner = styled.div<{ size: string }>`
  border: 1px solid;
  width: ${props => (props.size === 'big' ? '30%' : '25%')};
  height: ${props => (props.size === 'big' ? '250px' : '200px')};
  background-color: white;
  position: relative;
  padding: 20px;
`;

const XBtn = styled.button`
  position: absolute;
  right: 20px;
  z-index: 9999;
  background-color: transparent;
`;
