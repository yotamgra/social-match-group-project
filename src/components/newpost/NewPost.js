import { AddAPhoto, KeyboardArrowRight } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import { db } from "../../firebase";

const NewPost = () => {
  const [newPost, setNewPost] = useState("");
  const [photo, setPhoto] = useState(null);

  const postsCollection = collection(db, "posts");
  // const photoRef = ref(storage, "images");

  const createPost = async () => {
    await addDoc(postsCollection, {
      newPost,
      time: serverTimestamp(),
    });
  };

  // const uploadPhoto = () => {
  //   if (photo === null) return;

  //   uploadBytes(photoRef, photo).then(() => {
  //     alert("Photo uploaded");
  //   });
  // };

  return (
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

      {/* <Input
        type="file"
        label="Upload"
        onChange={(event) => {
          setPhoto(event.target.files[0]);
        }}
        startAdornment={
          <InputAdornment position="start">
            <AddAPhoto />
          </InputAdornment>
        }
      /> */}

      <Button
        color="warning"
        sx={{ mb: 1 }}
        variant="contained"
        disableElevation
        endIcon={<KeyboardArrowRight />}
        onClick={createPost}
      >
        SUBMIT
      </Button>
    </Card>
  );
};

export default NewPost;
