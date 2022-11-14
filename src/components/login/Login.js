import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../signup/Signup";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = ({ handleTabChange }) => {
  let emailRef = useRef();
  let passwordRef = useRef();
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  const paperStyle = {
    padding: 20,
    //   height: "70vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const buttonStyle = {
    margin: "8px 0",
  };

  function handleEmailChange(e) {
    emailRef = e.target.value;
    console.log(emailRef);
  }

  function handlePasswordChange(e) {
    passwordRef = e.target.value;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("login", emailRef, passwordRef);
      await login( emailRef, passwordRef);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            placeholder="Enter email"
            variant="standard"
            fullWidth
            required
            type="email"
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="standard"
            fullWidth
            required
            onChange={handlePasswordChange}
          />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          style={buttonStyle}
          >
          Sign in
        </Button>
          </form>
        <Typography>
          <Link className="login-links" to="#">
            {" "}
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          Do you have an account?{" "}
          <Link
            className="login-links"
            onClick={() => handleTabChange(null, 1)}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
