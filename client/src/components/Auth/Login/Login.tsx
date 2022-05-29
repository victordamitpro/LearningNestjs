import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import Joi from 'joi';
import { FC, useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { loginAsync } from '../../../apis/login';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { HttpStatusEnum } from '../../../enums/HttpStatusEnum';
import { ILoginModel } from '../../../Models/ILoginModel';
import commonStyle from '../Styles/Style';
import cardStyle from './Styles/CardStyle';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import CombineClassName from 'classnames';
import { Colors } from '../../../enums/ColorEnum';
import { Alert } from '@material-ui/lab';
import { IResponeModel } from '../../../Models/IResponeModel';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../../../stores/userStores';
import { ICurrentUserModel } from '../../../Models/ICurrentUserModel';

const schema = Joi.object({
  email: Joi.string()
    .required()
    .regex(
      /^[a-z|0-9|A-Z]*([_][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*(([_][a-z|0-9|A-Z]+)*)?@[a-z][a-z|0-9|A-Z]*\.([a-z][a-z|0-9|A-Z]*(\.[a-z][a-z|0-9|A-Z]*)?)$/i,
    )
    .trim()
    .min(1)
    .max(250)
    .label('Email')
    .messages({
      'string.empty': 'Email must not be empty',
      'string.trim': 'Email must not be empty',
      'string.pattern.base': 'Invalid Email',
      'any.required': 'Email must not be empty',
    }),
  password: Joi.string()
    .required()
    .trim()
    .min(1)
    .max(60)
    .label('Password')
    .messages({
      'string.empty': 'Password must not be empty',
      'string.trim': 'Password must not be empty',
      'any.required': 'Password must not be empty',
    }),
});

const Login: FC = () => {
  const initModel = {
    email: '',
    password: '',
  } as ILoginModel;
  const commonClass = commonStyle();
  const classnames = cardStyle();
  const [loginForm, setLoginForm] = useState(initModel);
  const [shadowForm] = useState(initModel);
  const loginFormError = useValidateForm(loginForm, schema);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<IResponeModel>({ message: '', status: 200 });
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();
  const { mutateAsync: loginMutate } = useMutation(
    (_loginRequest: ILoginModel) => loginAsync(_loginRequest),
  );

  const checkHasChange = useCallback(() => {
    return (
      Object.entries(loginForm).toString() !==
      Object.entries(shadowForm).toString()
    );
  }, [loginForm, shadowForm]);

  useEffect(() => {
    if (checkHasChange()) {
      setIsButtonDisabled(loginFormError && loginFormError.length > 0);
    } else {
      setIsButtonDisabled(true);
    }
  }, [checkHasChange, loginFormError, setIsButtonDisabled]);

  const getErrorMessage = (field: string) => {
    if (loginFormError && checkHasChange()) {
      const errorDetail = loginFormError?.filter((error) => {
        return error.path[0] === field;
      });
      return errorDetail && errorDetail.length !== 0
        ? errorDetail[0]?.message
        : '';
    }
    return '';
  };

  const handleLogin = async () => {
    if (!loginFormError) {
      setIsButtonDisabled(true);
      setLoading(true);
      var response = await loginMutate(loginForm);
      if (response.status === HttpStatusEnum.OK) {
        const user = {
          id: response.user.id || '',
          firstName: response.user?.firstName,
          lastName: response.user?.lastName,
          userName: response.user?.userName,
          email: response.user?.email || '',
        } as ICurrentUserModel;
        localStorage.setItem(
          'AccessToken',
          JSON.stringify({
            accessToken: response.accessToken,
            expiresIn: 3600,
            createAt: new Date(),
          }),
        );
        localStorage.setItem('User', JSON.stringify(user));
        setCurrentUser(user);
        navigate('/home');
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <Container>
      <Box className={CombineClassName(commonClass.cardWrapper)}>
        <Card className={CombineClassName(classnames.card, commonClass.card)}>
          <CardContent>
            <HeaderLogo caption="LOGIN" title="Welcome Back" />
            {err.status !== 200 && (
              <Box className={commonClass.alertWrapper}>
                <Alert
                  icon={false}
                  severity="error"
                  className={commonClass.alert}
                  style={{
                    borderColor: '#CD4927',
                  }}
                >
                  <span style={{ color: 'black', fontWeight: 700 }}>
                    {err.message}
                  </span>
                </Alert>
              </Box>
            )}
            <Box className={classnames.formWrapper}>
              <form>
                <TextField
                  error={getErrorMessage('email').length > 0}
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  helperText={getErrorMessage('email')}
                  onChange={(value) => {
                    const newForm = {
                      ...loginForm,
                      email: value.target.value,
                    };
                    setLoginForm(newForm);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <TextField
                  error={getErrorMessage('password').length > 0}
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  helperText={getErrorMessage('password')}
                  margin="normal"
                  onChange={(value) => {
                    const newForm = {
                      ...loginForm,
                      password: value.target.value,
                    };
                    setLoginForm(newForm);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        name="checkedB"
                        color="secondary"
                      />
                    }
                    label="Show password"
                    className={classnames.showPassword}
                  />
                  <Link to="/forgot-password">
                    <Typography
                      style={{
                        color: Colors.Orange,
                        fontWeight: 700,
                        fontSize: 12,
                        paddingBottom: 10,
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                </Box>
                <Box marginTop="20px">
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      background: isButtonDisabled ? Colors.Gray : Colors.Blue,
                    }}
                    onClick={handleLogin}
                    disabled={isButtonDisabled}
                    className={commonClass.btn}
                  >
                    {loading ? (
                      <CircularProgress
                        size={20}
                        className={commonClass.circularProgress}
                      />
                    ) : (
                      'lOGIN'
                    )}
                  </Button>
                  <Typography
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginBottom: 10,
                    }}
                  >
                    OR
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      background: Colors.Red,
                    }}
                    className={commonClass.btn}
                    href="api/auth/google/"
                  >
                    <img
                      src="https://viact.net/google-white.89b8fbb5.svg"
                      alt="google icon"
                      style={{ marginRight: 5 }}
                    />
                    LOGIN WITH GOOGLE
                  </Button>
                </Box>
              </form>
              {/* <Typography style={{ fontSize: 12, textAlign: 'center' }}>
                By continuing, you agree to Viact’s{' '}
                <span style={{ fontWeight: 700, color: Colors.orange }}>
                  Terms and Conditions.
                </span>
              </Typography> */}
              <Typography className={classnames.gotoSignup}>
                Not on Viact yet?{' '}
                <Link to="/sign-up" style={{ fontWeight: 700 }}>
                  <span style={{ color: Colors.Orange }}>Signup</span>
                </Link>{' '}
                now.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
