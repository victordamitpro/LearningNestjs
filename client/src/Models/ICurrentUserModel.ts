import { string } from 'yup';
export interface ICurrentUserModel {
  id: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email: string;
}
