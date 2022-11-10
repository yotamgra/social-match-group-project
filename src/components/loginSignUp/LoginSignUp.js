import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Container from "@mui/material/Container";
import { redirect } from "react-router-dom";

const LoginSignUp = () => {
  const paperStyle = {
    width: 340,
    margin: "20px auto",
  };

  //.............................................................................from MUI =>
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  //.............................................................................from MUI  <=

  return (
    <>
      {/* .............................................................................from MUI => */}
      <Paper elevation={20} style={paperStyle}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Signup />
          </TabPanel>
        </Box>
      </Paper>

      {/* .............................................................................from MUI  <= */}
    </>
  );
};

export default LoginSignUp;
