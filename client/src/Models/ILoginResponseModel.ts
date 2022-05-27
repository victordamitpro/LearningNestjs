export interface IUserLogin {
  id: number;
  name: string;
  email: string;
}

export interface ILoginResponseModel {
  expiresIn: number;
  accessToken: string;
  user: IUserLogin;
  status: number;
}
