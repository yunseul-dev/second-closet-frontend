import styled from 'styled-components';
import React from 'react';
import { BiStoreAlt } from '../../../utils/icons';
import { formatDate } from '../../../utils';
import { useNavigate } from 'react-router-dom';

interface Message {
  senderId: string;
  message: string;
  timestamp: number;
}

interface ListProps {
  message: {
    messageId: number;
    productId: string;
    partner: string | undefined;
    messages: Message[];
  };
}

const List: React.FC<ListProps> = ({ message }) => {
  const navigate = useNavigate();

  const { messageId, partner, messages } = message;

  const handleClick = () => {
    navigate(`/chatpage/${messageId}`);
  };

  return (
    <Container onClick={handleClick}>
      <ClosetIcon />
      <You>
        <User>{partner}</User>
        {messages.length && (
          <Content>
            <LastMent>{messages[messages.length - 1].message}</LastMent>
            <Day>{formatDate(messages[messages.length - 1].timestamp)}</Day>
          </Content>
        )}
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

const Day = styled.div``;
