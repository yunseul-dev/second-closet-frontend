import styled from 'styled-components';
import { BiStoreAlt } from 'react-icons/bi';
import React, { Dispatch, SetStateAction } from 'react';
import formatTimeAgo from '../../../utils/formatTimeAgo';

interface Message {
  senerId: string;
  message: string;
  timestamp: number;
}

interface ListProps {
  setClicked: Dispatch<SetStateAction<number | null>>;
  message: {
    messageId: number;
    partner: string;
    messages: Message[];
  };
}

const List: React.FC<ListProps> = ({ setClicked, message }) => {
  const { messageId, partner, messages } = message;

  const handleClick = () => setClicked(messageId);

  return (
    <Container onClick={handleClick}>
      <ClosetIcon />
      <You>
        <User>{partner}</User>
        <Content>
          <LastMent>{messages[messages.length - 1].message}</LastMent>
          <Date>{formatTimeAgo(messages[messages.length - 1].timestamp)}</Date>
        </Content>
      </You>
    </Container>
  );
};

export default List;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const ClosetIcon = styled(BiStoreAlt)`
  color: #fff;
  background-color: #a5a5a5;
  margin-right: 5px;
  border-radius: 50px;
  padding: 3px;
  width: 40px;
  height: 40px;
`;

const You = styled.div`
  padding: 5px;
  width: calc(100% - 50px);
`;

const User = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  font-size: 14px;
  color: #a5a5a5;
  justify-content: space-between;
`;

const LastMent = styled.div`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div``;
