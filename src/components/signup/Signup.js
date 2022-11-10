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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Signup = () => {
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

  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption">
              Please fill this form to create an account!
            </Typography>
          </Grid>
          <form>
            <TextField
              label="Name"
              placeholder="Enter your name"
              variant="standard"
              fullWidth
              required
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
            >
              {" "}
            </TextField>
            <TextField
              label="Phon Number"
              placeholder="Enter your phon number"
              variant="standard"
              fullWidth
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
