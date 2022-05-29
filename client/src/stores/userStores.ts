import { atom } from 'recoil';
import { ICurrentUserModel } from '../Models/ICurrentUserModel';

export const currentUserState = atom<ICurrentUserModel | null>({
  key: 'currentUserState',
  default: null,
});
