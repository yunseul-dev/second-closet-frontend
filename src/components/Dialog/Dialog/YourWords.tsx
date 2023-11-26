import React from 'react';
import styled from 'styled-components';
import { FaCircleUser } from '../../../utils/icons';
import { formatDate } from '../../../utils';

interface YourWordsProps {
  senderId: string;
  words: string;
  timestamp: number;
}

const YourWords: React.FC<YourWordsProps> = ({ senderId, words, timestamp }) => {
  return (
    <>
      <User>
        <You /> {senderId}
      </User>
      <Container>
        <Content>{words}</Content>
        <Day>{formatDate(timestamp)}</Day>
      </Container>
    </>
  );
};

export default YourWords;

const You = styled(FaCircleUser)`
  color: #ff4d24;
  margin-right: 5px;
`;

const User = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
`;

const Day = styled.div`
  font-size: 14px;
  margin-left: 5px;
  color: #a5a5a5;
`;

const Content = styled.div`
  background-color: rgba(255, 77, 36, 0.3);

  padding: 10px;
  border-radius: 0 10px 10px 10px;
  margin-bottom: 15px;
`;
