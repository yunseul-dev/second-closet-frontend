import styled from 'styled-components';
import { BiStoreAlt } from 'react-icons/bi';

const MessageList = () => {
  return (
    <Container>
      <Title>전체 대화</Title>
      <Lists>
        {Array.from({ length: 11 }, () => 1).map(idx => (
          <List key={idx}>
            <ClosetIcon />
            <You>
              <User>senderId</User>
              <Content>
                <LastMent>안녕하세요! 해당 상품에 어쩌구저쩌구어쩌구 저쩌구 어쩌구</LastMent>
                <Date>10월 12일</Date>
              </Content>
            </You>
          </List>
        ))}
      </Lists>
    </Container>
  );
};

export default MessageList;

const Container = styled.div`
  padding: 10px 0 10px 10px;
  position: absolute;
  left: 0;
  width: 35%;
  height: calc(100vh - 180px);
  border-right: 1px solid #ececec;
`;

const Title = styled.div`
  margin: 20px;
  font-size: 24px;
  font-weight: 600;
`;

const Lists = styled.div`
  height: calc(100vh - 180px - 80px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d0d0;
    border-radius: 5px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a5a5a5;
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const ClosetIcon = styled(BiStoreAlt)`
  color: #fff;
  background-color: #a5a5a5;
  margin-right: 5px;
  border-radius: 50px;
  padding: 3px;
  width: 40px;
  height: 40px;
`;

const You = styled.div`
  padding: 5px;
  width: calc(100% - 50px);
`;

const User = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  font-size: 14px;
  color: #a5a5a5;
  justify-content: space-between;
`;

const LastMent = styled.div`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div``;
