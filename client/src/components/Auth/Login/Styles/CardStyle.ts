import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.up('sm')]: {
        width: 520,
      },
    },
    formWrapper: {
      padding: 5,
      paddingBottom: '0 !important',
      [theme.breakpoints.up('sm')]: {
        padding: 30,
      },
    },
    textField: {
      '& input, & fieldset': {
        borderColor: '#4B4C4C',
      },
    },
    showPassword: {
      '& .MuiFormControlLabel-label': {
        fontSize: 12,
      },
    },
    gotoSignup: {
      fontSize: 13,
      textAlign: 'center',
      marginTop: 10,
      [theme.breakpoints.up('sm')]: {
        marginTop: 10,
      },
    },
  }),
);
