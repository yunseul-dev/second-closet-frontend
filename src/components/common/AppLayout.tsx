import Header from './Header';
import React from 'react';
import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <Container>{children}</Container>
    </LayoutContainer>
  );
};

export default AppLayout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100vh;
`;

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  padding: 10px;
  margin-top: 30px;
`;
