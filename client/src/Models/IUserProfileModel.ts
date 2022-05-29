export interface IUserProfileModel {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
}

export interface IUserProfileResponseModel {
  status: number;
  user: IUserProfileModel;
}
