import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { processFirebaseErrors } from "../../errors";
import { Container } from "react-bootstrap";

const Signup = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { signup, currentUser, createUserInfo } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const paperStyle = {
    padding: "20px",

    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const headerStyle = {
    margin: 0,
  };
  const marginTop = {
    marginTop: 10,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    //check password and password confirm
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      await signup(email, password, name, gender, phone);

      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(processFirebaseErrors(err.message));
    }
  }
  useEffect(() => {}, []);

  if (loading) return <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "200px",git a width:"100%" }}><CircularProgress  /></Container>;

  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="caption">
              Please fill this form to create an account!
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              placeholder="Enter your name"
              variant="standard"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            >
              {" "}
            </TextField>

            <FormControl style={marginTop}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                style={{ display: "initial" }}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Email"
              placeholder="Enter your email"
              variant="standard"
              fullWidth
              required
              type="email"
              style={{}}
              onChange={(e) => setEmail(e.target.value)}
            >
              {" "}
            </TextField>
            <TextField
              label="Phone Number"
              placeholder="Enter your phone number"
              variant="standard"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
            >
              {" "}
            </TextField>
            <TextField
              label="Password"
              placeholder="Enter your password"
              variant="standard"
              fullWidth
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            >
              {" "}
            </TextField>
            <TextField
              label="Confirm Password"
              placeholder="Enter your password again"
              variant="standard"
              fullWidth
              required
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            >
              {" "}
            </TextField>
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="I accept the terms and conditions"
            />
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
