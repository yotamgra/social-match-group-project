import { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewPost from "../newpost/NewPost";
import AllPosts from "../allPosts/AllPosts";
import Filter from "../filter/Filter";
import { usePosts } from "../../contexts/PostsContext";
import { Container } from "@mui/system";
import { Card, CardContent, TextField } from "@mui/material";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { setEditor } = usePosts();

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
      {/* <Filter /> */}
      <Container maxWidth="sm">
        <Card
          sx={{
            mt: 3,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <TextField
              required
              onFocus={() => {
                setEditor(false);
                navigate("/new-post");
              }}
              name="title"
              placeholder="Title"
              color="warning"
              id="input-title"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardContent>
            <TextField
              required
              onFocus={() => {
                setEditor(false);
                navigate("/new-post");
              }}
              name="description"
              placeholder="New Post"
              color="warning"
              id="input-newpost"
              variant="outlined"
              fullWidth
              rows={5}
              multiline
            />
          </CardContent>
        </Card>
      </Container>
      <AllPosts />
    </>
  );
};

export default Dashboard;
