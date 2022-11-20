import { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewPost from "../newpost/NewPost";

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
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
    </>
  );
};

export default Dashboard;
