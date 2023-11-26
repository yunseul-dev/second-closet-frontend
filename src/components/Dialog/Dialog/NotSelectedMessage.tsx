import styled from 'styled-components';
import { LuMessagesSquare } from '../../../utils/icons';

const NotSelectedMessage = () => {
  return (
    <None>
      <MessageIcon />
      <div>대화방을 클릭해주세요!</div>
    </None>
  );
};

export default NotSelectedMessage;

const None = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const MessageIcon = styled(LuMessagesSquare)`
  color: #ff4d24;
  margin: 5px;
`;
