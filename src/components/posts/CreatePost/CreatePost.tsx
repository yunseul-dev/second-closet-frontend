import styled from 'styled-components';
import Title from './Title';
import Contents from './Contents';

const CreatePost = () => {
  return (
    <Container>
      <Title />
      <Contents />
    </Container>
  );
};

export default CreatePost;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;
