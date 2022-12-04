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
    return <h4>There aren't posts to present</h4>;
  }
  return (
    <>
      <h2>All Posts</h2>
      <PresentPosts posts={filteredPosts} />
    </>
  );
};

export default AllPosts;
