import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import List from './List';
import { useChatSocketList } from '../../../hooks';
import { userState } from '../../../recoil/atom/userState';

type Message = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface NewMessage {
  messageId: number;
  productId: string;
  partner: string | undefined;
  messages: Message[];
}

const fetchMessages = async (userId: string) => {
  const { data } = await axios.get(`/api/messages/${userId}`);
  return data;
};

const MessageList = () => {
  const userId = useRecoilValue(userState) || '';
  const [messages, setMessages] = useState<NewMessage[]>([]);
  useChatSocketList(setMessages);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await fetchMessages(userId);
      setMessages(initialMessages);
    };

    fetchInitialMessages();
  }, []);

  return (
    <Container>
      <Title>전체 대화</Title>
      <Lists>
        {messages.map((message, idx) => (
          <List key={idx} message={message} />
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
  height: calc(100vh - 190px);
  border-right: 1px solid #ececec;
`;

const Title = styled.div`
  margin: 20px;
  font-size: 24px;
  font-weight: 600;
`;

const Lists = styled.div`
  height: calc(100vh - 190px - 80px);
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
