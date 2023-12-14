import { useCallback, ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useForm, Control, useController } from 'react-hook-form';
import { userState } from '../../recoil/atom';
import { ChangePwSchema } from '../../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword } from '../../api/auth';

interface ModalProps {
  closeModal: () => void;
}

interface ChangePwFormData {
  nowPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

interface InputProps {
  name: 'nowPassword' | 'newPassword' | 'passwordConfirm';
  control: Control<ChangePwFormData>;
  trigger: (field?: keyof ChangePwFormData | (keyof ChangePwFormData)[]) => void;
  label: string;
}

const PasswordInput = ({ name, control, trigger, label }: InputProps) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: '' });

  const debouncedTrigger = useCallback(
    debounce(() => {
      trigger(name);
      if (name === 'newPassword') trigger('passwordConfirm');
    }, 100),
    [trigger, name],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    debouncedTrigger();
  };

  return (
    <InfoContainer>
      <Label>{label}</Label>
      <InputTab>
        <Input type="password" id={name} name={name} autoComplete="off" onChange={handleChange} />
        {error && <ErrorMsg>{error?.message}</ErrorMsg>}
      </InputTab>
    </InfoContainer>
  );
};

const PwEditModal: React.FC<ModalProps> = ({ closeModal }) => {
  const userId = useRecoilValue(userState);

  const { control, trigger, handleSubmit } = useForm<ChangePwFormData>({
    resolver: zodResolver(ChangePwSchema),
  });

  const onSubmit = async (data: ChangePwFormData) => {
    try {
      await changePassword(userId, data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>비밀번호 변경</Title>
      <Content>
        <PasswordInput control={control} name="nowPassword" trigger={trigger} label="현재 비밀번호" />
        <PasswordInput control={control} name="newPassword" trigger={trigger} label="새 비밀번호" />
        <PasswordInput control={control} name="passwordConfirm" trigger={trigger} label="새 비밀번호 확인" />
      </Content>
      <ButtonContainer>
        <XBtn onClick={closeModal}>돌아가기</XBtn>
        <OBtn type="submit">변경</OBtn>
      </ButtonContainer>
    </Container>
  );
};

export default PwEditModal;

const Container = styled.form`
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
  margin-top: 5px;
  height: 40px;
`;

const InputTab = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const Label = styled.div`
  width: 35%;
`;

const Input = styled.input`
  width: 100%;
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
  background-color: #ff4d24;
  border: solid 1px #fe4218;
  color: white;
`;

const XBtn = styled(Button)`
  background-color: white;
`;

const ErrorMsg = styled.span`
  font-size: 13px;
  padding: 2px 10px 0 10px;
  color: #d40e0e;
`;
