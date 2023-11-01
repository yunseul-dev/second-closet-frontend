import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginStateKey',
  default: localStorage.getItem('isLogin') || false,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(isLogin => {
        localStorage.setItem('isLogin', JSON.stringify(isLogin));
      });
    },
  ],
});
