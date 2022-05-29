import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../stores/userStores';

const RedirectPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    console.log(params);
    if (params.token) {
      localStorage.setItem(
        'AccessToken',
        JSON.stringify({
          accessToken: params.token,
          expiresIn: 3600,
          createAt: new Date(),
        }),
      );
      const user = {
        id: params.id || '',
        firstName: params.firstName,
        lastName: params.lastName,
        userName: params.userName,
        email: params.email || '',
      };
      localStorage.setItem('User', JSON.stringify(user));
      setCurrentUser(user);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [params.token, navigate, setCurrentUser]);
  return <></>;
};

export default RedirectPage;
