import { Box, Chip } from "@mui/material";
import React from "react";

function PostChips({ post }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: "10px" }}>
      <Chip
        variant="outlined"
        label={`${post.spots - post.participants.length}  / ${post.spots}  `}
        // sx={{ mr: 1, float: "right" }}
      />
      <Chip
        variant="outlined"
        label={post.level}
        // sx={{ mr: 1, float: "right" }}
      />
      <Chip
        color="warning"
        variant="outlined"
        label={post.interest}
        // sx={{ float: "right" }}
      />
    </Box>
  );
}

export default PostChips;
