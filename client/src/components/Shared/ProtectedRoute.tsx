import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../../stores/userStores';
import { validateTokenExpired } from '../../ultils/tokenHandle';

export type ProtectedRouteProps = {
  outlet: JSX.Element;
  type: string;
};

const myToken = localStorage.getItem('AccessToken');

export default function ProtectedRoute({ outlet, type }: ProtectedRouteProps) {
  const setUserState = useSetRecoilState(currentUserState);
  const [accessToken, setAccessToken] = useState(myToken);
  useEffect(() => {
    const currentToken = JSON.parse(
      localStorage.getItem('AccessToken') || '{}',
    );
    if (currentToken) {
      const isTokenExpired = validateTokenExpired(
        new Date(currentToken.createAt),
        currentToken.expiresIn,
      );
      if (isTokenExpired) {
        localStorage.removeItem('AccessToken');
        setUserState(null);
        setAccessToken('');
      }

      setAccessToken(currentToken.accessToken);
      const userLogin = JSON.parse(localStorage.getItem('User') || '{}');
      if (userLogin) {
        const user = {
          id: userLogin.id || '',
          firstName: userLogin?.firstName,
          lastName: userLogin?.lastName,
          userName: userLogin?.userName,
          email: userLogin?.email || '',
        };

        setUserState(user);
      }
    } else {
      setUserState(null);
    }
  }, [accessToken, setUserState]);

  if (accessToken && type === 'private') {
    return outlet;
  } else {
    return <Navigate to={{ pathname: '/login' }} />;
  }
}
