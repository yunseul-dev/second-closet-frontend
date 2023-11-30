import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { NotSelectedMessage, SelectedMessage } from '.';

const Dialog = () => {
  const { id } = useParams();

  return <Container>{id ? <SelectedMessage key={id} id={id} /> : <NotSelectedMessage />}</Container>;
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
