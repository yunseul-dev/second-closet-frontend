import styled from 'styled-components';
import { useState, useRef } from 'react';
import { PwEditModal, WithdrawalModal, InfoContainer, Title } from '.';
import { useUserQuery } from '../../hooks/queries';
import Modal from '../common/Modal/Modal';
import { banks } from '../../constants';
import { editUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';

interface UserData {
  userId: string;
  userName: string;
  account: string;
  bank: string;
  address: string;
}

const AccountInfoEdit = () => {
  const { userInfo } = useUserQuery();
  const navigate = useNavigate();

  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [isWdModalOpen, setIsWdModalOpen] = useState(false);

  const userNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);
  const bankRef = useRef<HTMLSelectElement>(null);

  const openPwModal = () => setIsPwModalOpen(true);
  const closePwModal = () => setIsPwModalOpen(false);

  const openWdModal = () => setIsWdModalOpen(true);
  const closeWdModal = () => setIsWdModalOpen(false);

  const handleSubmit = async () => {
    try {
      const updatedData: Partial<UserData> = {};

      if (userNameRef.current?.value !== userInfo?.productName) {
        if (userNameRef.current?.value === '') {
          updatedData.userName = userInfo.userId;
        } else {
          updatedData.userName = userNameRef.current?.value;
        }
      }
      if (addressRef.current?.value !== userInfo?.address) {
        updatedData.address = addressRef.current?.value;
      }
      if (accountRef.current?.value !== userInfo?.account) {
        updatedData.account = accountRef.current?.value;
      }
      if (bankRef.current?.value !== userInfo?.bank) {
        updatedData.bank = bankRef.current?.value;
      }

      await editUser(userInfo?.userId, updatedData);
      navigate('/mypage');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title />
      <Content>
        <InfoContainer name="아이디">
          <Input value={userInfo?.userId} readOnly />
        </InfoContainer>
        <InfoContainer name="이름">
          <Input defaultValue={userInfo?.userName} ref={userNameRef} />
        </InfoContainer>
        <InfoContainer name="비밀번호">
          <ChangePw onClick={openPwModal}>비밀번호 변경</ChangePw>
        </InfoContainer>
        <InfoContainer name="계좌번호">
          <Select defaultValue={userInfo?.bank} ref={bankRef}>
            <option value="">선택</option>
            {banks.map(bank => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </Select>
          <BankInput defaultValue={userInfo?.account} ref={accountRef} />
        </InfoContainer>
        <InfoContainer name="주소">
          <Input defaultValue={userInfo?.address} ref={addressRef} />
        </InfoContainer>
      </Content>
      <ButtonContainer>
        <WdBtn onClick={openWdModal}>회원 탈퇴</WdBtn>
        <Buttons>
          <XBtn>취소</XBtn>
          <OBtn onClick={handleSubmit}>수정</OBtn>
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

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  height: 40px;
  padding-left: 10px;
`;

const BankInput = styled(Input)`
  width: 65%;
`;

const Select = styled.select`
  width: 15%;
`;

const ChangePw = styled.button`
  height: 40px;
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
  font-weight: 600;
  font-size: 16px;
`;

const WdBtn = styled.div`
  margin-top: 25px;
  font-size: 16px;
  text-decoration: underline;
`;

const OBtn = styled(Button)`
  background-color: #ff4d24;
  border: solid 1px #fe4218;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;
