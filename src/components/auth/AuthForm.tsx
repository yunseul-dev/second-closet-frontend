import { styled } from 'styled-components';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

type ButtonProps = {
  $active: boolean;
};

const AuthForm = () => {
  const [state, setState] = useState('signIn');

  return (
    <Container>
      <FlexWrapper>
        <img src="./assets/icons/closetFav.png" alt="Closet Icon" />
        <Title>SecondCloset</Title>
      </FlexWrapper>
      <CombinedSignBtns>
        <AuthBtn $active={state === 'signIn'} onClick={() => setState('signIn')}>
          Sign In
        </AuthBtn>
        <AuthBtn $active={state === 'signUp'} onClick={() => setState('signUp')}>
          Sign Up
        </AuthBtn>
      </CombinedSignBtns>
      {state === 'signIn' ? <SignIn /> : <SignUp setState={setState} />}
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
  border: 3px solid #fad4db;
  border-radius: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: 'Gamja Flower';
  text-align: center;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 40px;
`;

const CombinedSignBtns = styled.div`
  display: flex;
`;

const AuthBtn = styled.button<ButtonProps>`
  background-color: ${({ $active }) => ($active ? '#fad4db' : 'white')};
  color: ${({ $active }) => $active && '#f1899c'};
  font-size: 16px;
  width: 180px;
  height: 40px;
  font-weight: 800;
  padding: 10px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 30%;
    right: 30%;
    height: 3px;
    background-color: ${({ $active }) => $active && '#f1899c'};
  }
`;
