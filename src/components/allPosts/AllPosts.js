import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { usePosts } from "../../contexts/PostsContext";
import PresentPosts from "./PresentPosts";

const AllPosts = () => {
  const {
    getAllPosts,
    filteredPosts,
    getFilteredPosts,
    changeInPosts,
    setChangeInPosts,
  } = usePosts();

  useEffect(() => {
    getAllPosts();
    setChangeInPosts(false);
  }, [getAllPosts, changeInPosts, setChangeInPosts]);

  useEffect(() => {
    getFilteredPosts();
  }, [getFilteredPosts, changeInPosts]);

  if (filteredPosts.length === 0) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
          color: "#d32f2f",
          fontWeight: 900,
          fontSize: "1.5rem",
        }}
      >
        OOPS... No posts found
      </Typography>
    );
  }
  return (
    <>
      <PresentPosts posts={filteredPosts} />
    </>
  );
};

export default AllPosts;
