import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: undefined, 
});