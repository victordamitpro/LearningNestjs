import { Navigate } from 'react-router-dom';
import { string } from 'yup';

export type ProtectedRouteProps = {
  outlet: JSX.Element;
  type: string;
};

export default function ProtectedRoute({ outlet, type }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem('AccessToken');
  if (isAuthenticated && type === 'private') {
    return outlet;
  } else {
    return <Navigate to={{ pathname: '/login' }} />;
  }
}
