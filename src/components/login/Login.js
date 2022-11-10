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
import { Link } from "react-router-dom";
import Signup from "../signup/Signup";

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

const Login = ({handleChange}) => {
  return (
    <Grid>
      <Paper  style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          variant="standard"
          fullWidth
          required
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
        <Typography>
          <Link className="login-links" to="#">
            {" "}
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          Do you have an account?{" "}
          <Link className="login-links"onClick={()=> handleChange(null,1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
