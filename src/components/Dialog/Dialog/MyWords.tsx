import React from 'react';
import styled from 'styled-components';

interface MyWordsProps {
  words: string;
}

const MyWords: React.FC<MyWordsProps> = ({ words }) => {
  return <Container>{words}</Container>;
};

export default MyWords;

const Container = styled.div`
  background-color: #ff4d24;
  display: inline-flex;
  align-self: flex-end;
  padding: 10px;
  border-radius: 10px 10px 0 10px;
  margin-bottom: 15px;
  color: #fff;
`;
