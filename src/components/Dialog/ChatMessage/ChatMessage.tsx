import styled from 'styled-components';
import Dialog from '../Dialog/Dialog';
import MessageList from '../MessageList/MessageList';

const ChatMessage = () => {
  return (
    <Container>
      <MessageList />
      <Dialog />
    </Container>
  );
};

export default ChatMessage;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;
