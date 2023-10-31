import { z } from 'zod';

const useridRegExp = /^[A-Za-z0-9]{4,20}/;
const passwordRegExp = /^[A-Za-z0-9]{6,12}$/;

const signInSchema = z.object({
  userId: z.string().regex(/^\S/, '아이디를 입력하세요.'),
  password: z.string().regex(/^\S/, '비밀번호를 입력하세요.'),
});

const signUpSchema = z
  .object({
    userId: z.string().regex(useridRegExp, '아이디: 영문 또는 숫자를 4~20자 입력하세요.'),
    password: z.string().regex(passwordRegExp, '비밀번호: 영문 또는 숫자를 6~12자 입력하세요.'),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export { signInSchema, signUpSchema };
