import { z } from 'zod';

const useridRegExp = /^[A-Za-z0-9]{4,20}/;
const passwordRegExp = /^[A-Za-z0-9]{6,12}$/;

const signInSchema = z.object({
  userid: z.string().regex(useridRegExp, '이메일 형식에 맞게 입력해 주세요.'),
  password: z.string().regex(passwordRegExp, '영문 또는 숫자를 6~12자 입력하세요.'),
});

const signUpSchema = z
  .object({
    userid: z.string().regex(useridRegExp, '이메일 형식에 맞게 입력해 주세요.'),
    password: z.string().regex(passwordRegExp, '영문 또는 숫자를 6~12자 입력하세요.'),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: '패스워드가 일치하지 않습니다.',
  });

export { signInSchema, signUpSchema };
