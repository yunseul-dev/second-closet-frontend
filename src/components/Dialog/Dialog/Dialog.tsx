import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import NotSelectedMessage from './NotSelectedMessage';
import SelectedMessage from './SelectedMessage';

const Dialog = () => {
  const { id } = useParams();

  return <Container>{id ? <SelectedMessage /> : <NotSelectedMessage />}</Container>;
};

export default Dialog;

const Container = styled.div`
  position: absolute;
  left: 35%;
  position: relative;
  width: 65%;
  height: calc(100vh - 190px);
  padding: 20px;
`;
