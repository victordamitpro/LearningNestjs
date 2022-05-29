import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  outlet: JSX.Element;
  type: string;
};

export default function ProtectedRoute({ outlet, type }: ProtectedRouteProps) {
  const accessToken = localStorage.getItem('AccessToken');
  if (accessToken && type === 'private') {
    return outlet;
  } else {
    return <Navigate to={{ pathname: '/login' }} />;
  }
}
