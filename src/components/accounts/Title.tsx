import styled from 'styled-components';

const Title = () => {
  return (
    <TitleContainer>
      <TitleName>개인정보 수정</TitleName>
    </TitleContainer>
  );
};

export default Title;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 20px 0;
  border-bottom: 2px solid black;
`;

const TitleName = styled.div`
  font-size: 26px;
  font-weight: 400;
`;
