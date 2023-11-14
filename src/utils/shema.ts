import { z } from 'zod';

const userIdRegExp = /^[A-Za-z0-9]{4,20}/;

const signInSchema = z.object({
  userId: z.string().regex(/^\S/, '아이디를 입력하세요.'),
  password: z.string().regex(/^\S/, '비밀번호를 입력하세요.'),
});

const signUpSchema = z
  .object({
    userId: z.string().regex(userIdRegExp, '아이디: 영문 또는 숫자를 4~20자 입력하세요.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해 주세요')
      .regex(/^[a-zA-Z0-9]+$/, '영문 또는 숫자를 입력해 주세요')
      .min(6, '6자 이상 입력해 주세요')
      .max(12, '12자 이하로 입력해 주세요'),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

const signUpOptionSchema = z.object({
  address: z.string().min(1, '올바른 주소를 입력하세요.'),
  account: z.string().regex(/^\d+$/, '올바른 계좌번호를 입력하세요.'),
});

const ChangePwSchema = z
  .object({
    nowPassword: z.string().min(1, '패스워드를 입력해 주세요'),
    newPassword: z
      .string()
      .min(1, '비밀번호를 입력해 주세요')
      .regex(/^[a-zA-Z0-9]+$/, '영문 또는 숫자를 입력해 주세요')
      .min(6, '6자 이상 입력해 주세요')
      .max(12, '12자 이하로 입력해 주세요'),
    passwordConfirm: z.string(),
  })
  .refine(({ newPassword, passwordConfirm }) => newPassword === passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export { signInSchema, signUpSchema, signUpOptionSchema, ChangePwSchema };
