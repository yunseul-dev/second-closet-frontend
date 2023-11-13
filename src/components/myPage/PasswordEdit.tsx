import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

interface UserInfo {
  userId: string;
  userName: string;
  password: string;
  account: string;
  address: string;
}

interface PwEditProps {
  handlePwClick: () => void;
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

const PasswordEdit: React.FC<PwEditProps> = ({ handlePwClick, userInfo, setUserInfo }) => {
  return (
    <>
      <Content>
        <InfoContainer>
          <Label>현재 비밀번호</Label>
          <Input
            type="password"
            value={userInfo?.password}
            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </InfoContainer>
        <InfoContainer>
          <Label>새 비밀번호</Label>
          <Input
            type="password"
            value={userInfo?.password}
            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </InfoContainer>
        <InfoContainer>
          <Label>새 비밀번호 확인</Label>
          <Input
            type="password"
            value={userInfo?.password}
            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </InfoContainer>
      </Content>
      <ButtonContainer>
        <XBtn onClick={handlePwClick}>돌아가기</XBtn>
        <OBtn>변경</OBtn>
      </ButtonContainer>
    </>
  );
};

export default PasswordEdit;

const Content = styled.div`
  font-size: 16px;
  margin-top: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 5px 0 5px 0;
`;

const Label = styled.div`
  width: 30%;
  font-weight: 600;
`;

const Input = styled.input`
  width: 70%;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  right: 0;
  position: absolute;
`;

const Button = styled.button`
  margin-left: 10px;
  border: 1px solid;
  padding: 10px;
`;

const OBtn = styled(Button)`
  background-color: #f98181;
  border: solid 1px #fd7272;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;
