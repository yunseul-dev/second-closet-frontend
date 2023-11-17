import styled from 'styled-components';
import { FaCircleUser } from 'react-icons/fa6';
import React from 'react';

interface YourWordsProps {
  senderId: string;
  words: string;
}

const YourWords: React.FC<YourWordsProps> = ({ senderId, words }) => {
  return (
    <>
      <User>
        <You /> {senderId}
      </User>
      <Container>{words}</Container>
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
  background-color: rgba(255, 77, 36, 0.3);
  display: inline-flex;
  align-self: flex-start;
  padding: 10px;
  border-radius: 0 10px 10px 10px;
  margin-bottom: 15px;
`;
