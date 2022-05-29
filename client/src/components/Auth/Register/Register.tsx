import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import HeaderLogo from '../Login/HeaderLogo';
import CombineClassName from 'classnames';
import style from './Styles/Style';
import CommonStyles from '../Styles/Style';
import { IRegisterModel } from '../../../Models/IRegisterModel';
import { useCallback, useEffect, useState } from 'react';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../../enums/ColorEnum';
import Success from './Success';
import { registerAsync } from '../../../apis/register';
import { useMutation } from 'react-query';
import { HttpStatusEnum } from '../../../enums/HttpStatusEnum';

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
  password: Joi.string().required().trim().max(100).label('Password').messages({
    'string.empty': 'Password must not be empty',
    'string.trim': 'Password must not be empty',
    'any.required': 'Password must not be empty',
  }),
  confirmpassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  firstName: Joi.string()
    .required()
    .trim()
    .max(250)
    .label('FirstName')
    .messages({
      'string.empty': 'Last name must not be empty',
      'string.trim': 'Last name must not be empty',
      'any.required': 'Last name must not be empty',
    }),
  lastName: Joi.string().required().trim().max(250).label('LastName').messages({
    'string.empty': 'First name must not be empty',
    'string.trim': 'First name must not be empty',
    'any.required': 'First name must not be empty',
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
  userName: Joi.string().required().trim().max(250).label('UserName').messages({
    'string.empty': 'User name must not be empty',
    'string.trim': 'User name must not be empty',
    'any.required': 'User name must not be empty',
  }),
});

const Register = () => {
  const initModel = {
    email: '',
    password: '',
    confirmpassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userName: '',
  } as IRegisterModel;

  const classnames = style();
  const commonClass = CommonStyles();
  const [registerForm, setRegisterForm] = useState(initModel);
  const [shadowForm] = useState(initModel);
  const registerFormError = useValidateForm(registerForm, schema);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successDialog, setSuccessDialog] = useState<boolean>(false);
  const { mutateAsync: registerMutate } = useMutation(
    (_registerRequest: IRegisterModel) => registerAsync(_registerRequest),
  );

  const navigate = useNavigate();

  const checkHasChange = useCallback(() => {
    return (
      Object.entries(registerForm).toString() !==
      Object.entries(shadowForm).toString()
    );
  }, [registerForm, shadowForm]);

  useEffect(() => {
    if (checkHasChange()) {
      setIsButtonDisabled(registerFormError && registerFormError.length > 0);
    } else {
      setIsButtonDisabled(true);
    }
  }, [checkHasChange, registerFormError, setIsButtonDisabled]);

  const getErrorMessage = (field: string) => {
    if (registerFormError && checkHasChange()) {
      const errorDetail = registerFormError?.filter((error) => {
        return error.path[0] === field;
      });
      return errorDetail && errorDetail.length !== 0
        ? errorDetail[0]?.message
        : '';
    }
    return '';
  };

  const labelStar = (label: string) => (
    <div>
      {label} <span style={{ color: 'red' }}>*</span>
    </div>
  );

  const gotoConfirmSignup = () => navigate('/login');
  const gotoLogin = () => navigate('/login');

  const handleSignUp = async () => {
    if (!registerFormError) {
      setLoading(true);
      var request = {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        password: registerForm.password,
        userName: registerForm.userName,
        phone: registerForm.phone,
      };
      var response = await registerMutate(request);
      if (response.status === HttpStatusEnum.OK) {
        setLoading(false);
        setSuccessDialog(true);
      }
    }
  };

  return (
    <Container>
      <Box className={commonClass.cardWrapper}>
        <Card className={CombineClassName(commonClass.card, classnames.card)}>
          <Grid container>
            <Grid item md={6} xs={12} className={classnames.firstGrid}>
              <HeaderLogo
                caption="CREATE NEW ACCOUNT"
                title="Build smart risk free"
              />
              <Box className={classnames.listWrapper}>
                <ul className={classnames.listIntro}>
                  <li>
                    Understand why Viact is being used on millions of customers
                    everyday
                  </li>
                  <li>Find out if Viact is the right fit for your business</li>
                  <li>Get all your questions answered (personally)</li>
                  <li>
                    Completely risk-free with 14-day free trial and a 30-day
                    money back guarantee!
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <form className={classnames.form}>
                <TextField
                  label={labelStar('First Name')}
                  variant="outlined"
                  fullWidth
                  className="item"
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      firstName: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('firstName').length > 0}
                  helperText={getErrorMessage('firstName')}
                />
                <TextField
                  label={labelStar('Last Name')}
                  variant="outlined"
                  fullWidth
                  className="item"
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      lastName: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('lastName').length > 0}
                  helperText={getErrorMessage('lastName')}
                />
                <TextField
                  label={labelStar('Username')}
                  variant="outlined"
                  fullWidth
                  className="item"
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      userName: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('userName').length > 0}
                  helperText={getErrorMessage('userName')}
                />
                <TextField
                  label={labelStar('Email')}
                  variant="outlined"
                  fullWidth
                  className="item"
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      email: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('email').length > 0}
                  helperText={getErrorMessage('email')}
                />
                <TextField
                  label="Phone"
                  type="text"
                  variant="outlined"
                  fullWidth
                  className="item"
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      phone: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('phone').length > 0}
                  helperText={getErrorMessage('phone')}
                />
                <TextField
                  label={labelStar('Password')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  className="item"
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      password: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('password').length > 0}
                  helperText={getErrorMessage('password')}
                />
                <TextField
                  label={labelStar('Confirm Password')}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  className="item"
                  fullWidth
                  onChange={(value) => {
                    const newForm = {
                      ...registerForm,
                      confirmpassword: value.target.value,
                    };
                    setRegisterForm(newForm);
                  }}
                  error={getErrorMessage('confirmpassword').length > 0}
                  helperText={getErrorMessage('confirmpassword')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={showPassword}
                      name="checkedB"
                      color="secondary"
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                  }
                  label="Show password"
                />
                <Box marginTop="20px">
                  <Button
                    disabled={isButtonDisabled}
                    fullWidth
                    variant="contained"
                    style={{
                      background: isButtonDisabled ? Colors.Gray : Colors.Blue,
                    }}
                    className={commonClass.btn}
                    onClick={handleSignUp}
                  >
                    {loading && (
                      <CircularProgress
                        size={20}
                        style={{ marginRight: 10, color: 'white' }}
                      />
                    )}
                    SIGN UP
                  </Button>
                </Box>
              </form>
              <Box
                width="100%"
                textAlign="center"
                className={classnames.signUpIntro}
                marginBottom="20px"
              >
                <Typography>
                  By clicking Sign up or Continue with Google, you agree to
                  viAct’s{' '}
                  <span style={{ color: Colors.Orange, cursor: 'pointer' }}>
                    Terms and Conditions for Free Trial.
                  </span>
                </Typography>

                <Typography style={{ marginTop: 20 }}>
                  Already have an account?{' '}
                  <Link
                    style={{
                      fontWeight: 700,
                    }}
                    href="/login"
                  >
                    <span style={{ color: Colors.Orange }}>Log In.</span>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Success
        visible={successDialog}
        onClose={() => setSuccessDialog(false)}
        caption="create new account"
        title="Congratulations! You have registered successfully"
        primaryActionHandle={gotoConfirmSignup}
        secondaryActionHandle={gotoLogin}
      >
        <Box textAlign="center">
          <Typography style={{ marginBottom: 10 }}>
            An email has been sent to your email address. Please check for
            activation account.
          </Typography>
          <Typography>
            <span style={{ fontWeight: 700 }}>Didn’t receive the email?</span>{' '}
            Please check your spam folder or click{' '}
            <span style={{ color: Colors.Orange, cursor: 'pointer' }}>
              here
            </span>{' '}
            to resend the email. Still having trouble?{' '}
            <a href="mailto:viact@support.ai" style={{ color: Colors.Orange }}>
              Contact us.
            </a>
          </Typography>
        </Box>
      </Success>
    </Container>
  );
};

export default Register;
