import { Box, Chip } from "@mui/material";
import React from "react";

function PostChips({ post }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: "10px" }}>
      <Chip
        color="warning"
        variant="outlined"
        label={`${post.spots - post.participants.length}  / ${post.spots}  `}
      />
      <Chip variant="outlined" label={post.level} />
      <Chip color="warning" variant="outlined" label={post.interest} />
    </Box>
  );
}

export default PostChips;
