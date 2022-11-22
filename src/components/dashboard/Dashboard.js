import { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewPost from "../newpost/NewPost";
import AllPosts from "../allPosts/AllPosts";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login-signup");
    } catch (err) {
      console.log(err);
    }
  }

  console.log("Dashboard");
  return (
    <>
      <Navbar />
      <NewPost />
      <AllPosts />

      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default Dashboard;
