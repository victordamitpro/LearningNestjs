import { Grid, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getUserProfileAsync } from '../apis/user';
import { IUserProfileResponseModel } from '../Models/IUserProfileModel';
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
const HomePage: FC = () => {
  const currentUserValue = useRecoilValue(currentUserState);
  const classes = useStyles();
  const { data: userProfileData, isFetching } =
    useQuery<IUserProfileResponseModel>(
      ['getEstateDetails', currentUserValue?.id],
      () => getUserProfileAsync(currentUserValue?.id || ''),
    );
  if (isFetching) {
    return <div>Loading...</div>;
  }

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
          <Typography className={classes.textInfo}>
            {userProfileData?.user?.id}
          </Typography>
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
            {userProfileData?.user?.firstName}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.textDesciption}>Last Name:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.textInfo}>
            {userProfileData?.user?.lastName}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.textDesciption}>Email:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.textInfo}>
            {userProfileData?.user?.email}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
