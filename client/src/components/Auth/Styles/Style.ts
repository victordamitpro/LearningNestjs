import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 600,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    cardWrapper: {
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        padding: 0,
      },
    },
    card: {
      width: '100%',
      margin: 10,
      borderRadius: 20,
      [theme.breakpoints.up('sm')]: {
        margin: 30,
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgHeader: {
      width: 200,
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    textColorSecondary: {
      color: '#be4d25',
      marginLeft: 5,
      fontSize: 12,
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
      },
    },
    successTextColorSecondary: {
      '& > p': {
        fontSize: 12,
      },
      '& > img': {
        width: 200,
      },
    },
    successTitle: {
      '& .title': {
        fontSize: '18px !important',
        marginTop: 5,
      },
    },
    alertWrapper: {
      padding: '10px 5px',
      [theme.breakpoints.up('sm')]: {
        padding: '10px 30px 0',
      },
    },
    alert: {
      display: 'flex',
      justifyContent: 'center',
      border: '1px solid transparent',
      borderRadius: 0,
    },
    btn: {
      fontWeight: 700,
      color: 'white',
      marginBottom: 12,
      height: 48,
    },
    dialog: {
      background: 'transparent',
      boxShadow: 'none',
    },
    successBtn: {
      background: '#2596be',
      textTransform: 'uppercase',
      color: 'white',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 300,
      },
    },
    passwordRequire: {
      position: 'absolute',
      width: '100%',
      left: 0,
      bottom: -40,
      backgroundColor: 'white',
      zIndex: 10,
      padding: 10,
      boxShadow: theme.shadows[4],
      [theme.breakpoints.down('md')]: {
        bottom: 'auto',
        top: 50,
        zIndex: 20,
      },
    },
    circularProgress: {
      color: 'white',
      marginRight: 10,
    },
  }),
);
