// 유효성 검사 하는 버전

import { styled } from 'styled-components';
import { useForm, useController, Control } from 'react-hook-form';
import { signInSchema } from '../../utils/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useCallback, ChangeEvent } from 'react';

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
    <div>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        type={name.toLowerCase().includes('password') ? 'password' : 'text'}
        autoComplete="off"
        onChange={handleChange}
      />
    </div>
  );
};

const SignIn = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userid: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { data: user } = await axios.post('api/auth/signin', data, { withCredentials: true });
      console.log(user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FlexWrapper>
        <img src="./assets/icons/closetFav.png" alt="Closet Icon" />
        <Title>세컨클로젯</Title>
      </FlexWrapper>
      <CombinedSignBtns>
        <SignInBtn>Sign In</SignInBtn>
        <SignUpBtn>Sign Up</SignUpBtn>
      </CombinedSignBtns>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <InputContainer placeholder={'아이디'} control={control} name={'userid'} trigger={trigger} />
          <InputContainer placeholder={'비밀번호'} control={control} name={'password'} trigger={trigger} />
          {!isValid && (
            <>
              {errors.userid && errors.password && <ErrorMsg>{errors.userid?.message}</ErrorMsg>}
              {errors.userid && !errors.password && <ErrorMsg>{errors.userid?.message}</ErrorMsg>}
              {errors.password && !errors.userid && <ErrorMsg>{errors.password?.message}</ErrorMsg>}
            </>
          )}
          <SubmitBtn type="submit">Sign In</SubmitBtn>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  width: 30%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid #fad4db;
  border-radius: 10px;
  z-index: 999;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-family: 'Hi melody';
  text-align: center;
  margin-left: 10px;
`;

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
  width: 300px;
`;

const CombinedSignBtns = styled.div`
  display: flex;
`;

const SignInBtn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: #fad4db;
  color: #f1899c;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-left: 10px;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 30%;
    right: 30%;
    height: 3px;
    background-color: #f1899c;
  }
`;

const SignUpBtn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: white;
`;

const Input = styled.input`
  width: 280px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  border: 1px solid gray;
`;

const SubmitBtn = styled.button`
  width: 280px;
  height: 40px;
  margin-top: 10px;
  border-radius: 20px;
  font-weight: 800;
  border: none;
  padding: 10px;
  border: 1px solid gray;
  background-color: #f1899c;
  color: white;
`;

const ErrorMsg = styled.span`
  margin: 5px;
  font-size: small;
`;
