import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="warning"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="h4">Social Match</Typography>
      <Avatar></Avatar>
    </AppBar>
  );
};

export default Navbar;
