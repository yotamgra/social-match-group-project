import { useCallback, useEffect, useState } from "react";

import { usePosts } from "../../contexts/PostsContext";
import PresentPosts from "./PresentPosts";

const AllPosts = () => {
  const { posts, getAllPosts, filter, filteredPosts, getFilteredPosts } =
    usePosts();

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(()=>{
    getAllPosts();
  },[getAllPosts])
  
  
  const getFiltered = useCallback( async () => {
    try {
      
      console.log(filter.location || filter.intrest);
      if (filter.location || filter.intrest) {
        console.log("call getfilteredposts");
        await getFilteredPosts();
        setIsFiltered(true);
      }
    } catch (err) {
      console.log(err);
    }
    // console.log("here");
    // console.log("filter",filter);
  },[filter.intrest, filter.location, getFilteredPosts]);

  useEffect(() => {
    getFiltered();
  }, [getFiltered]);

  console.log("isFiltered", isFiltered);
  console.log("filteredPosts", filteredPosts);
  console.log("filteredPosts.length > 0 && isFiltered",filteredPosts.length > 0 && isFiltered);
  return filteredPosts.length > 0 && isFiltered ? (
    <>
      <h3>Filtered Posts</h3>
      <PresentPosts posts={filteredPosts} />
    </>
  ) : (
    <>
      <h2>All Posts</h2>
      <PresentPosts posts={posts} />
    </>
  );
};

export default AllPosts;
