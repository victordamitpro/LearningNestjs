import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Colors } from '../enums/ColorEnum';
import { currentUserState } from '../stores/userStores';

interface IErrorPage {
  error: number;
}

const useStyles = makeStyles(() => ({
  gobackBtn: {
    background: '#2596be',
    textTransform: 'uppercase',
    color: 'white',
    width: 100,
  },
  errorMessage: {
    color: Colors.Orange,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    fontSize: 40,
    padding: 40,
  },
}));

const ErrorPage: FC<IErrorPage> = (props) => {
  const setUserState = useSetRecoilState(currentUserState);
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    switch (props.error) {
      case 400:
        setErrorMessage('Bad Request Errors.');
        break;
      case 401:
        setErrorMessage('401 Unauthorized Errors.');
        break;
      case 404:
        setErrorMessage('Not Found Errors.');
        break;
      default:
        setErrorMessage('Internal Server Errors.');
        break;
    }
  }, [props.error, setErrorMessage]);

  const handleGoBack = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('User');
    setUserState(null);
    console.log('/login');
    navigate('/login');
  };
  return (
    <Container>
      <Grid container>
        <Grid xs={12} item>
          <Typography className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} item>
          <Button
            fullWidth
            variant="contained"
            style={{
              background: Colors.Blue,
            }}
            className={classes.gobackBtn}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
