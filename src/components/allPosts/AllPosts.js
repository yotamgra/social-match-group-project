import { useEffect, useState } from "react";

import { usePosts } from "../../contexts/PostsContext";

const AllPosts = () => {
  const { posts, getAllPosts, filter, filteredPosts, getFilteredPosts } = usePosts();
  const [isFiltered, setIsFiltered] = useState(false)
  useEffect(() => {
    const f = async () => {
      try{
        await getAllPosts();
        if(filter.location !== ""){
          await getFilteredPosts()
          setIsFiltered(true)

        }
    } catch(err){
      console.log(err);
    }
      console.log("here");
      console.log("filter",filter);
    };
    f();
  }, [filter]);


console.log("isFiltered",isFiltered);
console.log("filteredPosts",filteredPosts);
  return (filteredPosts.length > 0 && isFiltered)?( <>
    <h3>Filtered Posts</h3>
    { filteredPosts.map((post, index) => (
      <div className="post-container" key={index}>
        <p>{post.userId}</p>
        <p>{post.description}</p>
        <p>{(post.time.seconds)}</p>
      </div>
    ))}
  </>):(<>
    <h3>All Posts</h3>
    {posts.map((post, index) => (
      <div className="post-container" key={index}>
        <p>{post.userId}</p>
        <p>{post.description}</p>
        <p>{(post.time.seconds)}</p>
      </div>
    ))}
  </>);
};

export default AllPosts;
