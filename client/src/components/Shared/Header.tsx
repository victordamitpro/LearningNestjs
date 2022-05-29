import { FC } from 'react';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../stores/userStores';
import { Colors } from '../../enums/ColorEnum';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: Colors.Black,
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  welcome: {
    display: 'flex',
    paddingBottom: 5,
    color: Colors.White,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    marginLeft: '38px',
    size: '18px',
  },
  xs4: {
    display: 'flex',
    width: '20%',
  },
  xs8: {
    display: 'flex',
    width: '80%',
    justifyContent: 'end',
  },
}));

const headersData = [
  {
    id: 1,
    label: 'Logout',
  },
];

const Header: FC = () => {
  const { header, logo, menuButton, welcome, xs4, xs8 } = useStyles();
  const [userState, setUserState] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  const render = () => {
    return (
      <Toolbar className={logo}>
        {logoText}
        <div className={xs4}>{isAuthenticated() && getUserInfo()}</div>
        <div className={xs8}>{isAuthenticated() && getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const isAuthenticated = () => {
    return userState;
  };

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('User');
    setUserState(null);
    console.log('/login');
    navigate('/login');
  };

  const getUserInfo = () => {
    return (
      <Typography className={welcome}>
        {`Hi ${userState?.firstName} ${userState?.lastName} !`}
      </Typography>
    );
  };

  const getMenuButtons = () => {
    return headersData.map(({ id, label }) => {
      return (
        <div key={id}>
          <Button
            color="inherit"
            className={menuButton}
            onClick={() => handleLogout()}
          >
            {label}
          </Button>
        </div>
      );
    });
  };

  const logoText = (
    <div>
      <img
        height="70px"
        src="https://viact.net/logo-color.1ab1dfe3.svg"
        alt="logo color"
      />
    </div>
  );

  return (
    <header>
      <AppBar className={header}>{render()}</AppBar>
    </header>
  );
};

export default Header;
