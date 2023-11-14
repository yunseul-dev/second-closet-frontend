import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: localStorage.getItem('userInfo') || null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newUser => {
        localStorage.setItem('userInfo', JSON.stringify(newUser));
      });
    },
  ],
});
