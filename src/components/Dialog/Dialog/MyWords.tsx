import React from 'react';
import styled from 'styled-components';
import formatDate from '../../../utils/formatDate';

interface MyWordsProps {
  words: string;
  timestamp: number;
}

const MyWords: React.FC<MyWordsProps> = ({ words, timestamp }) => {
  return (
    <Container>
      <Day>{formatDate(timestamp)}</Day>
      <Content>{words}</Content>
    </Container>
  );
};

export default MyWords;

const Container = styled.div`
  display: inline-flex;
  align-self: flex-end;
  align-items: center;
`;

const Day = styled.div`
  font-size: 14px;
  margin-right: 5px;
  color: #a5a5a5;
`;

const Content = styled.div`
  background-color: #ff4d24;
  padding: 10px;
  border-radius: 10px 10px 0 10px;
  margin-bottom: 15px;
  color: #fff;
`;
