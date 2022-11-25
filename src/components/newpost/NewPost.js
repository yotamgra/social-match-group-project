import { KeyboardArrowRight } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  Box,
  Button,
  Card,
  CardContent,
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
import { useState } from "react";

import { usePosts } from "../../contexts/PostsContext";
import Interest from "./Interest";

const NewPost = () => {
  const { createNewPost, newPost, setNewPost, cities, setFilter } = usePosts();

  
  const [chosenCity, setChosenCity] = useState("");

  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [level, setLevel] = useState("");
  const [spots, setSpots] = useState(0);

  const handleDescription = (event) => {
    setNewPost({ ...newPost, description: event.target.value });
  };

  const handleCity = (event) => {
    setChosenCity(event.target.value);
    setNewPost({ ...newPost, city: event.target.value });
  };

  const handleDate = (event) => {
    setDate(event.target.value);
    setNewPost({ ...newPost, date: event.target.value });
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
    setNewPost({ ...newPost, level: event.target.value });
  };

  const handleSliderChange = (event, newValue) => {
    setSpots(newValue);
  };

  const handleInputChange = (event) => {
    setSpots(event.target.value === "" ? "" : Number(event.target.value));
    setNewPost({ ...newPost, spots: ~~event.target.value });
  };

  const handleBlur = () => {
    if (spots < 0) {
      setSpots(0);
    } else if (spots > 100) {
      setSpots(100);
    }
  };

  async function handleSubmitPost() {
    try {
      // setNewPost({...newPost, userIntrestsList})
      console.log(newPost);
      await createNewPost();
      setFilter({location:""})

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container maxWidth="sm">
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
            color="warning"
            onChange={handleDescription}
            id="outlined-basic"
            label="New Post"
            variant="outlined"
            fullWidth
            required
            rows={5}
            multiline
          />
        </CardContent>

        <Interest />
        <InputLabel
          id="select-city"
          sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}
        >
          City
        </InputLabel>
        <Select
          sx={{ width: 300, mb: 1, ml: "auto", mr: "auto" }}
          size="small"
          color="warning"
          id="select-city"
          required
          value={chosenCity}
          onChange={handleCity}
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
          sx={{ width: 300, mb: 1, ml: "auto", mr: "auto" }}
          id="date"
          type="datetime-local"
          size="small"
          required
          color="warning"
          onChange={handleDate}
        />
        <InputLabel
          id="date"
          sx={{ width: 300, mb: 0, ml: "auto", mr: "auto" }}
        >
          Level
        </InputLabel>
        <RadioGroup
          onChange={handleLevel}
          aria-labelledby="select-level"
          defaultValue="any"
          sx={{
            width: 300,
            mb: 0,
            ml: "auto",
            mr: "auto",
            justifyContent: "space-center",
          }}
        >
          <FormControlLabel value="any" control={<Radio />} label="Any" />
          <FormControlLabel
            value="beginner"
            control={<Radio />}
            label="Beginner"
          />
          <FormControlLabel
            value="intermediate"
            control={<Radio />}
            label="Intermediate"
          />
          <FormControlLabel
            value="advanced"
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
                onChange={handleSliderChange}
              />
            </Grid>
            <Grid item>
              <Input
                value={spots}
                size="small"
                onChange={handleInputChange}
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
          color="warning"
          sx={{ width: 300, mb: 2, ml: "auto", mr: "auto" }}
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowRight />}
          // onMouseOver={handleSubmitPost}
          onClick={handleSubmitPost}
        >
          SUBMIT
        </Button>
      </Card>
    </Container>
  );
};

export default NewPost;
