import { useCallback, ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import { styled } from 'styled-components';
import { debounce } from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpOptionSchema } from '../../../utils';
import { banks } from '../../../constants';
import { editUser } from '../../../api/user';

interface SignUpOptionData {
  address: string;
  account: string;
  bank: string;
}

interface InputProps {
  placeholder: string;
  control: Control<SignUpOptionData>;
  name: 'address' | 'account';
  trigger: any;
  isBank: boolean;
  setSelectedBank: Dispatch<SetStateAction<string>>;
}

interface SignUpOptionProps {
  userId: null | string;
  setUserId: Dispatch<SetStateAction<string | null>>;
  setState: Dispatch<SetStateAction<string>>;
}

interface Input {
  $bank: boolean;
}

const InputContainer = ({ placeholder, control, name, trigger, isBank, setSelectedBank }: InputProps) => {
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(e.target.value);
  };

  return (
    <InputWrapper>
      {isBank ? (
        <>
          <Bank>
            <BankSelect onChange={handleSelectChange}>
              <option value="">선택</option>
              {banks.map(bank => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </BankSelect>
            <Input
              id={name}
              $bank={isBank}
              name={name}
              placeholder={placeholder}
              type="text"
              autoComplete="off"
              onChange={handleChange}
            />
          </Bank>
          {error && <ErrorMsg>{error?.message}</ErrorMsg>}
        </>
      ) : (
        <>
          <Input
            id={name}
            $bank={isBank}
            name={name}
            placeholder={placeholder}
            type="text"
            autoComplete="off"
            onChange={handleChange}
          />
          {error && <ErrorMsg>{error?.message}</ErrorMsg>}
        </>
      )}
    </InputWrapper>
  );
};

const SignUpOption = ({ userId, setUserId, setState }: SignUpOptionProps) => {
  const { control, handleSubmit, trigger, getValues } = useForm<SignUpOptionData>({
    resolver: zodResolver(signUpOptionSchema),
    defaultValues: {
      address: '',
      account: '',
    },
  });

  const [selectedBank, setSelectedBank] = useState('');

  const clickSkipBtn = () => setState('signIn');

  const onSubmit = async () => {
    try {
      const data: SignUpOptionData = {
        address: getValues('address'),
        account: getValues('account'),
        bank: selectedBank,
      };

      await editUser(userId, data);
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
          <UserName>{userId}</UserName>
          님의 회원가입을 축하드립니다.
          <br />
          주소와 계좌번호를 입력해주세요!
        </Content>
        <InputContainer
          setSelectedBank={setSelectedBank}
          placeholder={' 주소'}
          isBank={false}
          control={control}
          name={'address'}
          trigger={trigger}
        />
        <InputContainer
          setSelectedBank={setSelectedBank}
          placeholder={'계좌번호'}
          isBank={true}
          control={control}
          name={'account'}
          trigger={trigger}
        />
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

const UserName = styled.span`
  font-weight: 600;
`;

const Input = styled.input<Input>`
  width: ${({ $bank }) => ($bank ? '200px' : '320px')};
  height: 40px;
  border-radius: ${({ $bank }) => ($bank ? '0 20px 20px 0' : '20px')};
  border: none;
  padding: 10px;
  border: 1px solid gray;
  margin-bottom: 0;
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
  margin: 10px;
`;

const Bank = styled.div`
  display: flex;
`;

const BankSelect = styled.select`
  width: 120px;
  height: 40px;
  border-radius: 20px 0 0 20px;
  border: 1px solid gray;
  font-size: 16px;
  padding: 10px;
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
