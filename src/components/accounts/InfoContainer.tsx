import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface InfoContainerProps {
  name: string;
  children?: ReactNode;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ name, children }) => {
  return (
    <Container>
      <Label>{name}</Label>
      {children}
    </Container>
  );
};

export default InfoContainer;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0 30px 0;
`;

const Label = styled.div`
  width: 20%;
  font-size: 18px;
`;
