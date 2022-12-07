import { Box, Chip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function PostChips({ post }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>Spots</Typography>
        <Chip
          sx={{ mr: 1 }}
          color={
            post.spots - post.participants.length > 0 ? "success" : "error"
          }
          variant="outlined"
          label={`${post.participants.length}  / ${post.spots}  `}
        />
      </Container>
      <Chip sx={{ mr: 1 }} variant="outlined" label={post.level} />
      <Chip color="warning" variant="outlined" label={post.interest} />
    </Box>
  );
}

export default PostChips;
