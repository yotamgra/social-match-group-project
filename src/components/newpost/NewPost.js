import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

const NewPost = () => {
  const [newPost, setNewPost] = useState("");

  const postsCollection = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollection, {
      newPost,
      time: serverTimestamp(),
    });
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 3, mb: 5 }}>
        <CardContent>
          <Container sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              color="warning"
              onChange={(event) => setNewPost(event.target.value)}
              id="outlined-basic"
              label="New Post"
              variant="outlined"
              fullWidth
              rows={5}
              multiline
            />
          </Container>
        </CardContent>

        <Box display="flex" justifyContent="center">
          <Button
            color="warning"
            sx={{ mb: 1 }}
            variant="contained"
            endIcon={<KeyboardArrowRight />}
            onClick={createPost}
          >
            SUBMIT
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default NewPost;
