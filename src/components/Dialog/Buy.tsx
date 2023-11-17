import styled from 'styled-components';
import Dialog from './Dialog';
import MessageList from './MessageList';

const Buy = () => {
  return (
    <Container>
      <MessageList />
      <Dialog />
    </Container>
  );
};

export default Buy;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;
