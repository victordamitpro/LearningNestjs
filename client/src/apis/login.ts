import { ILoginModel } from '../Models/ILoginModel';
import { ILoginResponseModel } from '../Models/ILoginResponseModel';
import { postAsync } from '../ultils/transportRequest';

export const loginAsync = async (
  request: ILoginModel,
): Promise<ILoginResponseModel> => {
  return postAsync<ILoginModel, ILoginResponseModel>(
    '/api/auth/login',
    request,
  );
};
