import styled from 'styled-components';
import Contents from './Contents';

const EditPost = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>기본 정보</Title>
        <MiniTitle>*필수 정보</MiniTitle>
      </TitleContainer>
      <Contents />
    </Container>
  );
};

export default EditPost;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 20px 0;
  border-bottom: 2px solid black;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const MiniTitle = styled.div`
  font-size: medium;
  color: red;
`;
