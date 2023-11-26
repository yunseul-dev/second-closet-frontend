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

const TitleName = styled.div`
  font-size: 26px;
  font-weight: 400;
`;

const MiniTitle = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: red;
`;
