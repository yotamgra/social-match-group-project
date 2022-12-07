import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { usePosts } from "../../contexts/PostsContext";
import { interestsOptions } from "../newpost/Interest";
import { Autocomplete, TextField, Card, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Filter = () => {
  const { cities, filter, setFilter } = usePosts();

  return (
    <>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 1,
          color: "#DD742D",
          fontWeight: 600,
          fontSize: 23,
        }}
      >
        All posts
      </Typography>
      <Container maxWidth="sm">
        <Card
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",

            justifyContent: "center",
          }}
        >
          <Box>
            <FormControl sx={{ m: 1 }} size="small">
              <InputLabel
                color="success"
                sx={{ backgroundColor: "white" }}
                shrink
                id="interest"
              >
                Interest
              </InputLabel>
              <Autocomplete
                fullWidth
                color="warning"
                id="autoselect-interest"
                size="small"
                required
                options={interestsOptions}
                sx={{ width: 260, mb: 1, ml: "auto", mr: "auto" }}
                renderInput={(params) => (
                  <TextField {...params} color="warning" />
                )}
                onChange={(event, value) =>
                  setFilter({ ...filter, interest: value })
                }
              />
            </FormControl>
            <FormControl
              sx={{
                m: 1,

                justifyContent: "center",
              }}
              size="small"
            >
              <InputLabel
                color="warning"
                shrink
                id="Location"
                sx={{ backgroundColor: "white" }}
              >
                Location
              </InputLabel>
              <Select
                fullWidth
                color="warning"
                labelId="Location"
                id="Location"
                value={filter.location}
                sx={{ width: 260 }}
                label="Location"
                onChange={(event) =>
                  setFilter({ ...filter, location: event.target.value })
                }
              >
                {cities.map((city) => (
                  <MenuItem value={city.id} key={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Card>
      </Container>
    </>
  );
};
export default Filter;
