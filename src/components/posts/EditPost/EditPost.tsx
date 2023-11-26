import styled from 'styled-components';
import Contents from './Contents';
import { Title } from '../../common/PostInput';

const EditPost = () => {
  return (
    <Container>
      <Title />
      <Contents />
    </Container>
  );
};

export default EditPost;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;
