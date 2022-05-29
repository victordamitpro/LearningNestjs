import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Colors } from '../enums/ColorEnum';
import { currentUserState } from '../stores/userStores';

const ErrorPage: FC = () => {
  const setUserState = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const handleGoBack = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('User');
    setUserState(null);
    console.log('/login');
    navigate('/login');
  };
  return (
    <>
      <div>There are some errors...</div>
      <div>
        <a
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: Colors.Orange,
          }}
          className="link"
          onClick={handleGoBack}
        >
          Go Back
        </a>
      </div>
    </>
  );
};

export default ErrorPage;
