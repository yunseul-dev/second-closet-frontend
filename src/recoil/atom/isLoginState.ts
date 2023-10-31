import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginStateKey',
  default: localStorage.getItem('isLoginStateKey') || 'false',
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(isLogin => {
        localStorage.setItem('isLoginStateKey', JSON.stringify(isLogin));
      });
    },
  ],
});
