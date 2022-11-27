import { useEffect, useState } from "react";

import { usePosts } from "../../contexts/PostsContext";
import PresentPosts from "../Post/PresentPosts";

const AllPosts = () => {
  const { posts, getAllPosts, filter, filteredPosts, getFilteredPosts } =
    usePosts();

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const f = async () => {
      try {
        await getAllPosts();
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
    };
    f();
  }, [filter]);

  console.log("isFiltered", isFiltered);
  console.log("filteredPosts", filteredPosts);
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
