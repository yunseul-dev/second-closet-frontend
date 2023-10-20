import { styled } from 'styled-components';
import { useForm, useController, Control } from 'react-hook-form';
import { signUpSchema } from '../../utils/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useCallback, ChangeEvent } from 'react';
// import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

interface SignUpFormData {
  userid: string;
  password: string;
  passwordConfirm: string;
}

interface InputProps {
  placeholder: string;
  control: Control<SignUpFormData>;
  name: 'userid' | 'password' | 'passwordConfirm';
  trigger: any;
}

const InputContainer = ({ placeholder, control, name, trigger }: InputProps) => {
  const {
    field: { onChange },
    fieldState: { invalid, isDirty, error },
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

const SignUp = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userid: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { data: user } = await axios.post('api/auth/signup', data, { withCredentials: true });
      console.log(user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <InputContainer
              placeholder={'비밀번호 확인'}
              control={control}
              name={'passwordConfirm'}
              trigger={trigger}
            />
            <SubmitBtn type="submit">Sign up</SubmitBtn>
          </FormWrapper>
        </form>
      </Container>
    </>
  );
};

export default SignUp;

const Container = styled.div`
  min-width: 400px;
  min-height: 500px;
  width: 25%;
  height: 56vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #fad4db;
  border-radius: 10px;
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
  padding: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 360px;
`;

const CombinedSignBtns = styled.div`
  display: flex;
`;

const SignInBtn = styled.button`
  width: 180px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: white;
  font-size: 16px;
`;

const SignUpBtn = styled.button`
  font-size: 16px;
  width: 180px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  background-color: #fad4db;
  color: #f1899c;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
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

const Input = styled.input`
  width: 320px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid gray;
  margin-bottom: 0;
  font-size: 16px;
`;

const SubmitBtn = styled.button`
  width: 320px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  border: none;
  padding: 10px;
  border: 1px solid gray;
  background-color: #f1899c;
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
