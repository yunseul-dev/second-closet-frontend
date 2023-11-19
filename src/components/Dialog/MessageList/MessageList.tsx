import styled from 'styled-components';
import React, { Dispatch, SetStateAction } from 'react';
import List from './List';
import useMessagesQuery from '../../../hooks/queries/useMessagesQuery';

interface MessageListProps {
  setClicked: Dispatch<SetStateAction<number | null>>;
}

const MessageList: React.FC<MessageListProps> = ({ setClicked }) => {
  const { messagesInfo: messages } = useMessagesQuery('all');

  return (
    <Container>
      <Title>전체 대화</Title>
      <Lists>
        {messages.map((message, idx) => (
          <List key={idx} setClicked={setClicked} message={message} />
        ))}
      </Lists>
    </Container>
  );
};

export default MessageList;

const Container = styled.div`
  padding: 10px 0 10px 10px;
  position: absolute;
  left: 0;
  width: 35%;
  height: calc(100vh - 180px);
  border-right: 1px solid #ececec;
`;

const Title = styled.div`
  margin: 20px;
  font-size: 24px;
  font-weight: 600;
`;

const Lists = styled.div`
  height: calc(100vh - 180px - 80px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d0d0;
    border-radius: 5px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a5a5a5;
  }
`;
