import styled from 'styled-components';
import React from 'react';

import NotSelectedMessage from './NotSelectedMessage';
import SelectedMessage from './SelectedMessage';

interface DialogProps {
  id: number | null;
}

const Dialog: React.FC<DialogProps> = ({ id }) => {
  return <Container>{id ? <SelectedMessage id={id} /> : <NotSelectedMessage />}</Container>;
};

export default Dialog;

const Container = styled.div`
  position: absolute;
  left: 35%;
  position: relative;
  width: 65%;
  height: calc(100vh - 180px);
  padding: 20px;
`;
