export interface IUserLogin {
  id: number;
  firstName?: string;
  lastName?: string;
  userName: string;
  email: string;
}

export interface ILoginResponseModel {
  expiresIn: number;
  accessToken: string;
  user: IUserLogin;
  status: number;
}
