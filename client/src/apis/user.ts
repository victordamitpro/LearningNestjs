import { IUserProfileResponseModel } from '../Models/IUserProfileModel';
import { getAsync } from '../ultils/transportRequest';

export const getUserProfileAsync = async (
  id: string,
): Promise<IUserProfileResponseModel> => {
  const buildUrl: string = `/api/users/${id}/profile`;
  return await getAsync<IUserProfileResponseModel>(buildUrl);
};
