import { styled } from 'styled-components';
import { useForm, useController, Control } from 'react-hook-form';
import { signUpSchema } from '../../utils/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface SignUpFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}

interface InputProps {
  placeholder: string;
  control: Control<SignUpFormData>;
  name: 'userId' | 'password' | 'passwordConfirm';
  trigger: (field?: keyof SignUpFormData | (keyof SignUpFormData)[]) => void;
}

interface SignUpProps {
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
      if (name === 'password') trigger('passwordConfirm');
    }, 100),
    [trigger, name],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    debouncedTrigger();
  };

  return (
    <InputWrapper>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        type={name.toLowerCase().includes('password') ? 'password' : 'text'}
        autoComplete="off"
        onChange={handleChange}
      />
      {error && <ErrorMsg>{error?.message}</ErrorMsg>}
    </InputWrapper>
  );
};

const SignUp = ({ setUserId, setState }: SignUpProps) => {
  const { control, handleSubmit, trigger } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { data: user } = await axios.post('api/auth/signup', data, { withCredentials: true });
      setUserId(user.userId);
      console.log(user.userId, '님의 회원가입을 축하드립니다.');
      setState('signUpOption');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <InputContainer placeholder={'아이디'} control={control} name={'userId'} trigger={trigger} />
        <InputContainer placeholder={'비밀번호'} control={control} name={'password'} trigger={trigger} />
        <InputContainer placeholder={'비밀번호 확인'} control={control} name={'passwordConfirm'} trigger={trigger} />
        <SubmitBtn type="submit">Sign up</SubmitBtn>
      </FormWrapper>
    </form>
  );
};

export default SignUp;

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

const SubmitBtn = styled.button`
  width: 320px;
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
