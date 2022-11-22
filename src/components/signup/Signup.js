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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { processFirebaseErrors } from "../../errors";

const Signup = () => {
  let nameRef = useRef();

  let genderRef = useRef();
  let emailRef = useRef();
  let phoneRef = useRef();
  let passwordRef = useRef();
  let passwordConfirmRef = useRef();
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

  function handleNameChange(e) {
    nameRef = e.target.value;
  }

  function handleGenderChange(e) {
    genderRef = e.target.value;
  }
  function handleEmailChange(e) {
    emailRef = e.target.value;
  }

  function handelPhoneChange(e) {
    phoneRef = e.target.value;
  }

  function handlePasswordChange(e) {
    passwordRef = e.target.value;
  }

  function handlePasswordConfirmChange(e) {
    passwordConfirmRef = e.target.value;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //check password and password confirm
    if (passwordRef !== passwordConfirmRef) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      await signup(emailRef, passwordRef);
      await createUserInfo(nameRef, genderRef, phoneRef);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(processFirebaseErrors(err.message));
    }
  }
  useEffect(() => {
    genderRef = "female";
    console.log("gender", genderRef);
  }, []);

  if (loading) return <div>loading...</div>;

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
              onChange={handleNameChange}
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
                onChange={handleGenderChange}
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
              onChange={handleEmailChange}
            >
              {" "}
            </TextField>
            <TextField
              label="Phone Number"
              placeholder="Enter your phone number"
              variant="standard"
              fullWidth
              onChange={handelPhoneChange}
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
              onChange={handlePasswordChange}
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
              onChange={handlePasswordConfirmChange}
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
