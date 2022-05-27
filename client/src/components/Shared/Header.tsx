import { FC } from 'react';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#70848b',
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
}));

const headersData = [
  {
    label: 'Logout',
  },
];

const Header: FC = () => {
  const { header, logo, menuButton } = useStyles();
  const navigate = useNavigate();

  const render = () => {
    return (
      <Toolbar>
        {logoText}
        <div>{isAuthenticated() && getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const isAuthenticated = () => {
    return localStorage.getItem('AccessToken');
  };

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    navigate('/login');
  };

  const getMenuButtons = () => {
    return headersData.map(({ label }) => {
      return (
        <Button
          color="inherit"
          className={menuButton}
          onClick={() => handleLogout()}
        >
          {label}
        </Button>
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
