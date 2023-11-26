import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header, ArrowUpBtn } from '.';

type LayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <LayoutContainer>
        <Header />
        <Container>{children}</Container>
      </LayoutContainer>
      <ArrowUpBtn />
    </>
  );
};

export default AppLayout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1240px;
  min-width: 1024px;
  height: 100vh;
`;

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-top: 170px;
`;
