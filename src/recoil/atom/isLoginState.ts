import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: localStorage.getItem(localStorage.getItem('isLoginStateKey') || 'false'),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(isLogin => {
        localStorage.setItem('isLoginStateKey', JSON.stringify(isLogin));
      });
    },
  ],
});
