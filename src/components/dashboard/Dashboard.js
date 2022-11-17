import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  
  async function handleLogout() {
   

    try {
      await logout();
      navigate("/login-signup");
    } catch(err) {
      console.log(err);
    }
  }

  console.log("Dashboard");
  return ( 
    <>
    <h1>hello</h1>
    <button onClick={handleLogout}>Log out</button>
    </>
   );
}
 
export default Dashboard;