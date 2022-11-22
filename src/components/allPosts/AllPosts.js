import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AllPosts = () => {
  const { posts, getAllPosts } = useAuth();
  useEffect(() => {
    const f = async () => {
      await getAllPosts();
      // console.log(posts);
    };
    f();
  }, []);

  return (
    <>
      <h3>All Posts</h3>
      {posts.map((post, index) => (
        <div className="post-container" key={index}>
          <p>{post.userId}</p>
          <p>{post.description}</p>
          <p>{(post.time.seconds)}</p>
        </div>
      ))}
    </>
  );
};

export default AllPosts;
