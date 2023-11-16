import styled from 'styled-components';

const Title = () => {
  return (
    <TitleContainer>
      <TitleName>기본 정보</TitleName>
      <MiniTitle>*필수 정보</MiniTitle>
    </TitleContainer>
  );
};

export default Title;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 20px 0;
  border-bottom: 2px solid black;
`;

const MiniTitle = styled.div`
  font-size: medium;
  color: red;
`;

const TitleName = styled.div`
  font-size: 32px;
  font-weight: 600;
`;
