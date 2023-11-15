import { styled } from 'styled-components';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { LuShirt } from 'react-icons/lu';
import SignUpOption from './SignUpOption';

type ButtonProps = {
  $active: boolean;
};

const AuthForm = () => {
  const [state, setState] = useState('signIn');
  const [userId, setUserId] = useState<null | string>(null);

  return (
    <Container>
      <FlexWrapper>
        <LuShirt />
        <Title>SecondCloset</Title>
      </FlexWrapper>
      {state === 'signUpOption' ? (
        <SignUpOption userId={userId} setUserId={setUserId} setState={setState} />
      ) : (
        <>
          <CombinedSignBtns>
            <AuthBtn $active={state === 'signIn'} onClick={() => setState('signIn')}>
              Sign In
            </AuthBtn>
            <AuthBtn $active={state === 'signUp'} onClick={() => setState('signUp')}>
              Sign Up
            </AuthBtn>
          </CombinedSignBtns>
          {state === 'signIn' ? <SignIn /> : <SignUp setUserId={setUserId} setState={setState} />}
        </>
      )}
    </Container>
  );
};

export default AuthForm;

const Container = styled.div`
  min-width: 420px;
  min-height: 500px;
  width: 25%;
  height: 56vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #fdecd0;
  background-color: #fdecd0;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: 'Gaegu';
  font-weight: 600;
  text-align: center;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 40px;
`;

const CombinedSignBtns = styled.div`
  display: flex;
`;

const AuthBtn = styled.button<ButtonProps>`
  background-color: #fdecd0;
  color: ${({ $active }) => $active && '#fdb849'};
  font-size: 16px;
  width: 180px;
  height: 40px;
  font-weight: 800;
  padding: 10px;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 30%;
    right: 30%;
    height: 3px;
    background-color: ${({ $active }) => $active && '#fdb849'};
  }
`;
