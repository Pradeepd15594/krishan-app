import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// Material-UI
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Link from '@mui/material/Link';
import AuthService from '../../../Services/Auth.Service';
import { useNavigate } from 'react-router-dom';
import GradientCircularProgress from './../../../Components/GradientCircularProgress'

// Project import
import AuthWrapper from './../AuthWrapper';
// import FirebaseSocial from './FirebaseSocial';

// Third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData, setLoading, cleanRedirect } from './../../../Redux/Actions/SagaAction';
import { kMaxLength } from 'buffer';

// ================================|| LOGIN ||================================ //

const Login: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading:boolean=useSelector((state:any)=>state.AppReducer.isLoading);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const inputStyle: any = {
    width: '100%',
    height: '48px',
    padding: '8px 5px',
    fontSize: '14px',
  };

  const handleSubmit = async (form:any) => {
    console.log(form, 'form');
    setMessage('');
    try {
      dispatch(cleanRedirect());
      dispatch(setLoading(true));
      const result = await AuthService.signIn(form.mobile, form.password);
      console.log(result, 'result');

      if (result && result.status === true && result.data) {
        await AuthService.setAuthData(result.data);
        await AuthService.setAuthToken(result.data['token']);
        dispatch(setAuthData(result.data));
        setMessage(result?.message);
        dispatch(setLoading(false));
        navigate('/dashboard');
      } else {
        setMessage(result?.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <AuthWrapper>
      <Grid container spacing={0}>
        <Grid size={{xs:12, md:12, lg:12}}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" style={{ fontSize: '1.5rem' }}>Login</Typography>
          </Stack>
        </Grid>
        <Grid size={{xs:12, md:12, lg:12}}>
          <Formik
            initialValues={{
              mobile: '',
              password: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              mobile: Yup.string()
                .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
                .required('Mobile number is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}

            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{xs:12, md:12, lg:12}}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="mobile-login">Mobile Number({values.mobile.length}/10)</InputLabel>
                      <OutlinedInput
                        id="mobile-login"
                        type="text"
                        value={values.mobile}
                        name="mobile"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter 10 degit mobile number"
                        fullWidth
                        sx={inputStyle}
                        inputProps={{ maxLength: 10 }}
                        error={Boolean(touched.mobile && errors.mobile)}
                      />
                    </Stack>
                    {touched.mobile && errors.mobile && (
                      <FormHelperText error id="standard-weight-helper-text-mobile-login">
                        {errors.mobile}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid size={{xs:12, md:12, lg:12}}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ ...inputStyle, paddingRight: '18px' }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="secondary"
                            >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                      />
                    </Stack>
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                      </FormHelperText>
                    )}

                    {isLoading ? (
                      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <GradientCircularProgress size={32} thickness={5}/>
                    </div>
                    ):null}
                    
                  </Grid>

                  <Grid size={{xs:12, md:12, lg:12}} mt={-1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography style={{ fontSize: 14 }} variant="h6">Keep me signed in</Typography>}
                      />
                      <Link variant="h6" style={{ fontSize: 14, visibility:'hidden' }} component={RouterLink} color="text.primary" to="/forgot-password">
                        Forgot Password?
                      </Link>
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid size={{xs:12, md:12, lg:12}}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  {message && (
                    <Grid size={{xs:12, md:12, lg:12}}>
                      <FormHelperText error>{message}</FormHelperText>
                    </Grid>
                  )}
                  <Grid size={{xs:12, md:12, lg:12}}>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                  {/* <Grid size={{xs:12, md:12, lg:12}}>
                    <Divider>
                      <Typography variant="caption"> Login with</Typography>
                    </Divider>
                  </Grid> */}
                  <Grid size={{xs:12, md:12, lg:12}}>
                    {/* <FirebaseSocial /> */}
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>

      </Grid>
      
    </AuthWrapper>
  );
};

export default Login;