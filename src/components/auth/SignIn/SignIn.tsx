import { styled } from 'styled-components';
import { useForm, useController, Control } from 'react-hook-form';
import { signInSchema } from '../../../utils/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useCallback, ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../../recoil/atom/userState';
import { isLoginState } from '../../../recoil/atom/isLoginState';

interface SignInFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}

interface InputProps {
  placeholder: string;
  control: Control<SignInFormData>;
  name: 'userId' | 'password' | 'passwordConfirm';
  trigger: any;
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
      if (name === 'password') trigger('confirmPassword');
    }, 100),
    [],
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

const SignIn = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const { control, handleSubmit, trigger } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { data: userId } = await axios.post('api/auth/signin', data, { withCredentials: true });
      setUser(userId);
      setIsLogin(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <InputContainer placeholder={'아이디'} control={control} name={'userId'} trigger={trigger} />
        <InputContainer placeholder={'비밀번호'} control={control} name={'password'} trigger={trigger} />
        <SubmitBtn type="submit">Sign In</SubmitBtn>
      </FormWrapper>
    </form>
  );
};

export default SignIn;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fdecd0;
  padding: 10px;
  width: 360px;
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 0;
  font-size: 16px;
  border: 1px solid gray;
`;

const SubmitBtn = styled.button`
  width: 320px;
  height: 40px;
  margin-top: 10px;
  border-radius: 20px;
  font-weight: 700;
  border: none;
  padding: 10px;
  background-color: #f6c26e;
  border: 1px solid #f9c26a;
  color: white;
  font-size: 16px;
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
