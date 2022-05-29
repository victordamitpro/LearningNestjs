import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export type ClientLayoutProps = {
  children: ReactElement;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: `${theme.spacing(0)} auto`,
      background: "url('https://viact.net/auth-bg.256b7710.png') #0b454f;",
      backgroundPosition: '50%',
      backgroundSize: 'cover',
      height: '100vh',
    },
  }),
);

const EmptyLayout: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth={false} className={classes.container}>
        <Outlet />
      </Container>
    </div>
  );
};

export default EmptyLayout;
