import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import PasswordEdit from './PasswordEdit';

interface UserInfo {
  userId: string;
  userName: string;
  password: string;
  account: string;
  address: string;
}

interface WithDrawalProps {
  closeModal: () => void;
}

const AccountInfoEditModal: React.FC<WithDrawalProps> = ({ closeModal }) => {
  const userId = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: '',
    userName: '',
    password: '',
    account: '',
    address: '',
  });
  const [pwEdit, setPwEdit] = useState(false);

  const handlePwClick = () => setPwEdit(!pwEdit);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/users/${userId}`);

      setUserInfo(res.data);
    };

    fetchData();
  }, []);

  console.log('userInfo', userInfo);

  return (
    <Container>
      <Title>회원정보 수정</Title>
      {pwEdit ? (
        <PasswordEdit handlePwClick={handlePwClick} userInfo={userInfo} setUserInfo={setUserInfo} />
      ) : (
        <>
          <Content>
            <InfoContainer>
              <Label>아이디</Label>
              <Input value={userInfo?.userId} onChange={e => setUserInfo({ ...userInfo, userId: e.target.value })} />
            </InfoContainer>
            <InfoContainer>
              <Label>이름</Label>
              <Input
                value={userInfo?.userName}
                onChange={e => setUserInfo({ ...userInfo, userName: e.target.value })}
              />
            </InfoContainer>
            <InfoContainer>
              <Label>비밀번호</Label>
              <button onClick={handlePwClick}>비밀번호 수정</button>
            </InfoContainer>
            <InfoContainer>
              <Label>계좌번호</Label>
              <Input value={userInfo?.account} onChange={e => setUserInfo({ ...userInfo, account: e.target.value })} />
            </InfoContainer>
            <InfoContainer>
              <Label>주소</Label>
              <Input value={userInfo?.address} onChange={e => setUserInfo({ ...userInfo, address: e.target.value })} />
            </InfoContainer>
          </Content>
          <ButtonContainer>
            <XBtn onClick={closeModal}>취소</XBtn>
            <OBtn>수정</OBtn>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default AccountInfoEditModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

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
