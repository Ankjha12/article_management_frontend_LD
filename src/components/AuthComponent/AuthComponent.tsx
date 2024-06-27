import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../Input";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { SignIn, SignUp } from "../../redux/action/authAction";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({isSignUp}: any) => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate: any = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFromData] = React.useState(initialState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("here is the form Data", formData);

    if (isSignUp) {
      const hashedPassword = await bcrypt.hashSync(formData?.password, "$2a$10$0123456789012345678901")
      const hashedconfirmPassword = await bcrypt.hashSync(formData?.confirmPassword, "$2a$10$0123456789012345678901")

      const signupData = {...formData, password: hashedPassword, confirmPassword: hashedconfirmPassword}
      dispatch(
        SignUp(signupData, (success: boolean | any) => {
          if (success) {
            navigate("/login");
          }
        })
      );
    }else {
      const hashedPassword = await bcrypt.hashSync(formData?.password, "$2a$10$0123456789012345678901")
      const loginData = {email: formData?.email, password: hashedPassword}
      dispatch(SignIn(loginData, navigate))
    }
  };

  const handleChange = (e: any) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Input
              name="email"
              label="User Name"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                handleShowPassword={handleShowConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => navigate(isSignUp ? '/login' : '/signup')}>
                {isSignUp
                  ? "Already have an Account? Sign In"
                  : "Don't have an Account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
