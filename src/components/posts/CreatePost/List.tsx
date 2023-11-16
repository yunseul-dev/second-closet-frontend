import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface NameProps {
  name: string;
  must: boolean;
  children?: ReactNode;
  extraChildren?: ReactNode;
}

const List: React.FC<NameProps> = ({ name, must, children, extraChildren }) => {
  return (
    <Container>
      <Name>
        {name}
        {extraChildren}
        {must && <Must>*</Must>}
      </Name>
      {children}
    </Container>
  );
};

export default List;

const Container = styled.div`
  display: flex;
  font-size: 16px;
  margin: 30px 0 30px 0;
`;

const Name = styled.div`
  font-size: 18px;
  width: 20%;
  min-width: 192px;
`;

const Must = styled.span`
  font-size: 20px;
  color: red;
`;
