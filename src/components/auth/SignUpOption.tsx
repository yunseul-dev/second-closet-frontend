import { styled } from 'styled-components';
import { useForm, useController, Control } from 'react-hook-form';
import { signUpOptionSchema } from '../../utils/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface SignUpOptionData {
  address: string;
  account: string;
}

interface InputProps {
  placeholder: string;
  control: Control<SignUpOptionData>;
  name: 'address' | 'account';
  trigger: any;
}

interface SignUpOptionProps {
  userId: null | string;
  setUserId: Dispatch<SetStateAction<string | null>>;
  setState: Dispatch<SetStateAction<string>>;
}

const InputContainer = ({ placeholder, control, name, trigger }: InputProps) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const debouncedTrigger = useCallback(
    debounce(() => {
      trigger(name);
    }, 100),
    [],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    debouncedTrigger();
  };

  return (
    <InputWrapper>
      <Input id={name} name={name} placeholder={placeholder} type="text" autoComplete="off" onChange={handleChange} />
      {error && <ErrorMsg>{error?.message}</ErrorMsg>}
    </InputWrapper>
  );
};

const SignUpOption = ({ userId, setUserId, setState }: SignUpOptionProps) => {
  const { control, handleSubmit, trigger } = useForm<SignUpOptionData>({
    resolver: zodResolver(signUpOptionSchema),
    defaultValues: {
      address: '',
      account: '',
    },
  });

  const clickSkipBtn = () => setState('signIn');

  const onSubmit = async (data: SignUpOptionData) => {
    try {
      await axios.patch(`api/users/personalInfo/${userId}`, data);
      setUserId(null);
      setState('signIn');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <Title>Congratulations !</Title>
        <Content>
          ${userId}님의 회원가입을 축하드립니다.
          <br />
          주소와 계좌번호를 입력해주세요!
        </Content>
        <InputContainer placeholder={'주소'} control={control} name={'address'} trigger={trigger} />
        <InputContainer placeholder={'은행 , 계좌번호'} control={control} name={'account'} trigger={trigger} />
        <SubmitButtonGroup>
          <SubmitBtn onClick={clickSkipBtn}>Skip</SubmitBtn>
          <SubmitBtn type="submit">Submit</SubmitBtn>
        </SubmitButtonGroup>
      </FormWrapper>
    </form>
  );
};

export default SignUpOption;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fdecd0;
  padding: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 360px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #fdb849;
`;

const Content = styled.div`
  font-size: 14px;
  padding: 10px 0 10px 0;
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  border: 1px solid gray;
  margin-bottom: 0;
  font-size: 16px;
`;

const SubmitButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitBtn = styled.button`
  width: 155px;
  height: 40px;
  margin-top: 10px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  border: none;
  padding: 10px;
  border: 1px solid #f9c26a;
  background-color: #f6c26e;
  color: white;
`;

const ErrorMsg = styled.span`
  font-size: 13px;
  padding: 2px 10px 0 10px;
  color: #d40e0e;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 10px;
`;
