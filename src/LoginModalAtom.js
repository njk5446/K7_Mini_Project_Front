import { atom, selector } from "recoil";

export const loginModalAtom = atom({
    key: 'loginModalAtom',
    default: false,
  });

export const LoginModalSel = selector({
  key: 'LoginModalSel', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    return get(loginModalAtom);
  },
});