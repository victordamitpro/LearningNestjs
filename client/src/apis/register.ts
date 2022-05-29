import { IRegisterModel } from './../Models/IRegisterModel';
import { postAsync } from '../ultils/transportRequest';
import { IResponeModel } from '../Models/IResponeModel';

export const registerAsync = async (
  request: IRegisterModel,
): Promise<IResponeModel> => {
  return postAsync<IRegisterModel, IResponeModel>(
    '/api/auth/register',
    request,
  );
};
