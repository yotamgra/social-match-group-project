import { useCallback, useEffect, useState } from "react";

import { usePosts } from "../../contexts/PostsContext";
import PresentPosts from "./PresentPosts";

const AllPosts = () => {
  const { posts, getAllPosts, filter, filteredPosts, getFilteredPosts, changeInPosts, setChangeInPosts } =
    usePosts();

  // const [isFiltered, setIsFiltered] = useState(false);

  useEffect(()=>{
    getAllPosts();
    setChangeInPosts(false)
  },[getAllPosts, changeInPosts, setChangeInPosts])
  
  
  const getFiltered = useCallback( async () => {

 getFilteredPosts()
  },[getFilteredPosts ]);

  useEffect(() => {
    getFiltered();
  }, [getFiltered]);

  // console.log("isFiltered", isFiltered);
  console.log("filteredPosts", filteredPosts);
  // console.log("filteredPosts.length > 0 && isFiltered",filteredPosts.length > 0 && isFiltered);

  if(filteredPosts.length===0){
    return <h4>There aren't posts to present</h4>
  }
  return (
    <>
      <h2>All Posts</h2>
      <PresentPosts posts={filteredPosts} />
    </>
  );
};

export default AllPosts;
