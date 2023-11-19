import styled from 'styled-components';
import Dialog from './Dialog/Dialog';
import MessageList from './MessageList/MessageList';
import { useState } from 'react';

const Buy = () => {
  const [clicked, setClicked] = useState<number | null>(null);

  return (
    <Container>
      <MessageList setClicked={setClicked} />
      <Dialog id={clicked} />
    </Container>
  );
};

export default Buy;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;
