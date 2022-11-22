import { AddAPhoto, KeyboardArrowRight } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { addDoc, getDocs, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import { db } from "../../firebase";
import { usePosts } from "../../contexts/PostsContext";
import IntrestsTags from "./IntrestsTags";


const NewPost = () => {
  const { createNewPost, userIntrestsList, setUserIntrestsList, newPost, setNewPost } = usePosts();
  
  

 

  const [photo, setPhoto] = useState(null);

  // const photoRef = ref(storage, "images");

  async function handleSubmitPost() {
    try {
      // setNewPost({...newPost, userIntrestsList})
      console.log(newPost);
      createNewPost();
    } catch (err) {
      console.log(err);
    }
  }

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
            onChange={(e) => setNewPost({...newPost,description: e.target.value})}
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

      <IntrestsTags />
      {/* {console.log("inside new post",userIntrestsList)} */}
      <Button
        color="warning"
        sx={{ mb: 1 }}
        variant="contained"
        disableElevation
        endIcon={<KeyboardArrowRight />}
        onClick={handleSubmitPost}
      >
        SUBMIT
      </Button>
    </Card>
  );
};

export default NewPost;
