import { Grid, makeStyles, Typography } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getUserProfileAsync } from '../apis/user';
import { IUserProfileModel } from '../Models/IUserProfileModel';
import { currentUserState } from '../stores/userStores';

const useStyles = makeStyles(() => ({
  textHead: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    textAlign: 'center',
    padding: 25,
  },
  textDesciption: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
    alignItems: 'left',
    textAlign: 'left',
    padding: 5,
  },
  textInfo: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400,
    size: '18px',
    marginLeft: '38px',
    alignItems: 'left',
    textAlign: 'left',
    padding: 5,
  },
}));

const initModel = {
  id: '',
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phone: '',
};

const HomePage: FC = () => {
  const user = localStorage.getItem('User');
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState<IUserProfileModel>(initModel);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  useEffect(() => {
    if (user != null) {
      var userInfo = JSON.parse(user);
      const fetchData = async () => {
        const data = await getUserProfileAsync(userInfo.id);

        if (data) {
          setUserProfile(data.user);
          setCurrentUserState(data.user);
        }
      };
      fetchData();
    }
  }, [user, setCurrentUserState]);

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={6}>
          <Typography className={classes.textHead}>
            User Profile Info:
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.textDesciption}>Id:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.textInfo}>{userProfile.id}</Typography>
        </Grid>
      </Grid>
      <Grid container></Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.textDesciption}>
            First Name:
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.textInfo}>
            {userProfile.firstName}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.textDesciption}>Last Name:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.textInfo}>
            {userProfile.lastName}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.textDesciption}>Email:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.textInfo}>
            {userProfile.email}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
