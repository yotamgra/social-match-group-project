import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
// import styled from "styled-components";

// const StyledToolbar = styled(Toolbar)({
//   display: "flex",
//   justifyContent: "space-between",
// });

const Navbar = () => {
  return (
    <AppBar position="static" color="warning">
      {/* <StyledToolbar> */}
        <Typography variant="h4">Social Match</Typography>
        <Avatar></Avatar>
      {/* </StyledToolbar> */}
    </AppBar>
  );
};

export default Navbar;
