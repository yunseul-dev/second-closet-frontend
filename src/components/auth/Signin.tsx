import { styled } from 'styled-components';
import { useForm, useController, Control } from 'react-hook-form';
import { signInSchema } from '../../utils/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useCallback, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atom/userState';

interface SignInFormData {
  userid: string;
  password: string;
  passwordConfirm: string;
}

interface InputProps {
  placeholder: string;
  control: Control<SignInFormData>;
  name: 'userid' | 'password' | 'passwordConfirm';
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
  const [user, setUser] = useRecoilState(userState);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userid: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { data: userid } = await axios.post('api/auth/signin', data, { withCredentials: true });
      setUser(userid);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <InputContainer placeholder={'아이디'} control={control} name={'userid'} trigger={trigger} />
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
  background-color: #fad4db;
  padding: 10px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
  border: 1px solid gray;
  background-color: #f1899c;
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
