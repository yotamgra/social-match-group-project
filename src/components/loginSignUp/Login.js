import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { processFirebaseErrors } from "../../errors";

const Login = ({ handleTabChange }) => {
  let emailRef = useRef();
  let passwordRef = useRef();
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await login(emailRef, passwordRef);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(processFirebaseErrors(err.message));
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
          {error && <Alert severity="error">{error}</Alert>}
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
