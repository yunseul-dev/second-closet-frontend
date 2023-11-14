import styled from 'styled-components';
import { useState } from 'react';
import PwEditModal from './PwEditModal';
import useUserQuery from '../../hooks/queries/useUserQuery';
import Modal from '../common/Modal';
import WithdrawalModal from './WithdrawalModal';

const AccountInfoEdit = () => {
  const { userInfo } = useUserQuery();

  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [isWdModalOpen, setIsWdModalOpen] = useState(false);

  const openPwModal = () => setIsPwModalOpen(true);
  const closePwModal = () => setIsPwModalOpen(false);

  const openWdModal = () => setIsWdModalOpen(true);
  const closeWdModal = () => setIsWdModalOpen(false);

  return (
    <Container>
      <Content>
        <InfoContainer>
          <Label>아이디</Label>
          <Input value={userInfo?.userId} readOnly />
        </InfoContainer>
        <InfoContainer>
          <Label>이름</Label>
          <Input value={userInfo?.userName} />
        </InfoContainer>
        <InfoContainer>
          <Label>비밀번호</Label>
          <button onClick={openPwModal}>비밀번호 수정</button>
        </InfoContainer>
        <InfoContainer>
          <Label>계좌번호</Label>
          <Input value={userInfo?.account} />
        </InfoContainer>
        <InfoContainer>
          <Label>주소</Label>
          <Input value={userInfo?.address} />
        </InfoContainer>
      </Content>
      <ButtonContainer>
        <WdBtn onClick={openWdModal}>회원 탈퇴</WdBtn>
        <Buttons>
          <XBtn>취소</XBtn>
          <OBtn>수정</OBtn>
        </Buttons>
      </ButtonContainer>
      {isPwModalOpen && (
        <Modal content={<PwEditModal closeModal={closePwModal} />} closeModal={closePwModal} size="big" />
      )}
      {isWdModalOpen && (
        <Modal content={<WithdrawalModal closeModal={closeWdModal} />} closeModal={closeWdModal} size="small" />
      )}
    </Container>
  );
};

export default AccountInfoEdit;

const Container = styled.div`
  padding: 20px;
  padding-top: 0;
`;

const Content = styled.div`
  font-size: 16px;
  margin-top: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0 30px 0;
`;

const Label = styled.div`
  width: 20%;
  font-size: 18px;
`;

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  height: 40px;
  padding-left: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;

const Button = styled.button`
  margin-left: 10px;
  width: 40%;
  height: 55px;
  border: 1px solid;
  padding: 10px;
`;

const WdBtn = styled.div`
  margin-top: 25px;
  font-size: 16px;
  text-decoration: underline;
`;

const OBtn = styled(Button)`
  background-color: #f98181;
  border: solid 1px #fd7272;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;
