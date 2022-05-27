import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: '30px 0 0',
      [theme.breakpoints.up('sm')]: {
        padding: '30px',
      },
      [theme.breakpoints.up('lg')]: {
        width: 1000,
      },
    },
    firstGrid: {
      borderRight: 'none',
      [theme.breakpoints.up('md')]: {
        borderRight: '1px solid #EBEBEB',
      },
    },
    listWrapper: {
      padding: 20,
      [theme.breakpoints.up('sm')]: {
        padding: 0,
      },
      [theme.breakpoints.up('md')]: {
        padding: 20,
      },
    },
    listIntro: {
      paddingLeft: 10,
      '& li': {
        fontSize: 14,
        color: '#4B4C4C',
        marginBottom: 20,
        [theme.breakpoints.up('sm')]: {
          fontSize: 16,
          marginBottom: 30,
        },
        '&:last-child': {
          marginBottom: 0,
        },
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 30,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 0,
      },
    },
    form: {
      padding: '0 20px 20px',
      '& .item': {
        marginBottom: 12,
        '& .phone-input': {
          width: '100%',
          height: 53.28,
          '&:focus': {
            borderColor: '#FF6A3D',
            boxShadow: `0 0 0 1px #FF6A3D`,
          },
        },
        '& .special-label': {
          fontSize: 11,
          left: 8,
          color: '#898989',
        },
        '&.label-active .special-label': {
          color: '#FF6A3D',
        },
        '& .phone-search .phone-search-box': {
          width: '95%',
          marginLeft: 0,
          height: '40px',
        },
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: 20,
      },
    },
    wrappedTextField: {
      '& div': {
        [theme.breakpoints.down('sm')]: {
          '&:first-child': {
            paddingBottom: 0,
          },
          '&:last-child': {
            paddingTop: 0,
          },
        },
      },
    },
    signUpIntro: {
      padding: '0 30px',
      [theme.breakpoints.up('md')]: {
        padding: '0 70px',
      },
      '& p': {
        fontSize: 12,
      },
    },
  }),
);
