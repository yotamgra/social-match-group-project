import { KeyboardArrowRight } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { usePosts } from "../../contexts/PostsContext";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import InterestsTags from "./Interest";

const NewPost = () => {
  const {
    createNewPost,
    newPost,
    setNewPost,
    cities,
    setFilter,
    loading,
    setLoading,
    editor,
    setEditor,
    editForm,
    editUserPost,
    setChangeInPosts,
    setEditForm,
  } = usePosts();
  const navigate = useNavigate();

  const intialNewPost = {
    title: "",
    description: "",
    spots: 15,
    city: "",
    date: "",
    level: "",
    interest: "",
  };

  const [chosenCity, setChosenCity] = useState("");
  const [level, setLevel] = useState("");
  const [spots, setSpots] = useState(15);

  useEffect(() => {
    setNewPost({ ...newPost, spots: 15 });
    console.log("editor", editor);
    if (editor) {
      setChangeInPosts(true);
      setNewPost({ ...editForm });
      setChosenCity(editForm.city);
      setLevel(editForm.level);
      setSpots(editForm.spots);
    } else {
      setNewPost({ ...intialNewPost });
    }
  }, []);

  const handleBlur = () => {
    if (spots < 0) {
      setSpots(0);
    } else if (spots > 100) {
      setSpots(100);
    }
  };

  async function handleSubmitPost() {
    try {
      setLoading(true);
      if (editor) {
        // EDIT POST
        editUserPost({ ...newPost });
        setEditor(false);
        setNewPost({ ...intialNewPost });
      } else {
        await createNewPost();
        setFilter({ location: "", interest: "" });
      }
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  if (loading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Container>
    );

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <form onSubmit={handleSubmitPost}>
          <Card
            sx={{
              mt: 3,
              mb: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <TextField
                required
                onChange={(event) =>
                  setNewPost({ ...newPost, title: event.target.value })
                }
                name="title"
                placeholder="Title"
                color="warning"
                id="input-title"
                variant="outlined"
                fullWidth
                value={newPost.title}
              />
            </CardContent>
            <CardContent>
              <TextField
                required
                onChange={(event) =>
                  setNewPost({ ...newPost, description: event.target.value })
                }
                name="description"
                placeholder="New Post"
                color="warning"
                id="input-newpost"
                variant="outlined"
                fullWidth
                rows={5}
                multiline
                value={newPost.description}
              />
            </CardContent>

            <InterestsTags editInterest={editForm.interest} />
            <InputLabel
              id="select-city"
              sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}
            >
              City
            </InputLabel>
            <Select
              required
              onChange={(event) => {
                setChosenCity(event.target.value);
                setNewPost({ ...newPost, city: event.target.value });
              }}
              name="city"
              sx={{ width: 300, mb: 1, ml: "auto", mr: "auto" }}
              size="small"
              color="warning"
              id="select-city"
              value={chosenCity}
            >
              {cities &&
                cities.map((city) => {
                  return (
                    <MenuItem value={city.id} key={city.id}>
                      {city.name}
                    </MenuItem>
                  );
                })}
            </Select>

            <InputLabel
              id="date"
              sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}
            >
              Date
            </InputLabel>
            <TextField
              required
              onChange={(event) => {
                setNewPost({ ...newPost, date: event.target.value });
              }}
              name="date"
              sx={{ width: 300, mb: 1, ml: "auto", mr: "auto" }}
              id="date"
              type="datetime-local"
              size="small"
              color="warning"
              value={newPost.date}
            />
            <InputLabel
              id="level"
              sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}
            >
              Level
            </InputLabel>
            <RadioGroup
              onChange={(event) => {
                setLevel(event.target.value);
                setNewPost({ ...newPost, level: event.target.value });
              }}
              name="level"
              value={level ? level : "All levels"}
              sx={{
                width: 300,
                mb: 0,
                ml: "auto",
                mr: "auto",
                justifyContent: "space-center",
              }}
            >
              <FormControlLabel
                color="warning"
                value="All levels"
                control={<Radio />}
                label="All levels"
              />
              <FormControlLabel
                color="warning"
                value="Beginner"
                control={<Radio />}
                label="Beginner"
              />
              <FormControlLabel
                color="warning"
                value="Intermediate"
                control={<Radio />}
                label="Intermediate"
              />
              <FormControlLabel
                color="warning"
                value="Advanced"
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>
            <InputLabel
              id="date"
              sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}
            >
              Spots
            </InputLabel>
            <Box sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <GroupsIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    valueLabelDisplay="on"
                    color="warning"
                    value={typeof spots === "number" ? spots : 0}
                    onChange={(event, newValue) => {
                      setSpots(newValue);
                      setNewPost({ ...newPost, spots: parseInt(newValue) });
                    }}
                  />
                </Grid>
                <Grid item>
                  <Input
                    required
                    onChange={(event) => {
                      setSpots(
                        event.target.value === ""
                          ? ""
                          : Number(event.target.value)
                      );
                      setNewPost({
                        ...newPost,
                        spots: parseInt(event.target.value),
                      });
                    }}
                    name="spots"
                    value={spots}
                    size="small"
                    onBlur={handleBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 100,
                      type: "number",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              color="warning"
              sx={{ width: 300, mb: 2, ml: "auto", mr: "auto" }}
              variant="contained"
              disableElevation
              endIcon={<KeyboardArrowRight />}
            >
              SUBMIT
            </Button>
          </Card>
        </form>
      </Container>
    </>
  );
};

export default NewPost;
