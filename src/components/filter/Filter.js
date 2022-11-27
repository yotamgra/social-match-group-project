import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { usePosts } from "../../contexts/PostsContext";
import { intrestsOptions } from "../newpost/Interest";
import { Autocomplete, TextField } from "@mui/material";

const Filter = () => {
  const { cities, filter, setFilter } = usePosts();

  return (
    <>
      <h5>filter by:</h5>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
          <InputLabel shrink sx={{ backgroundColor: "white" }} id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter.location}
            label="location"
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
        <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
          <InputLabel  sx={{ backgroundColor: "white" }} shrink id="demo-simple-select-label">Type an intrest</InputLabel>
          <Autocomplete
         
            id="autoselect-interest"
            size="small"
            required
            options={intrestsOptions}
            sx={{ width: 300, mb: 1, ml: "auto", mr: "auto" }}
            renderInput={(params) => <TextField  {...params} color="warning" />}
            onChange={(event, value) =>
              setFilter({ ...filter, intrest: value })
            }
          />
        </FormControl>
      </Box>
    </>
  );
};
export default Filter;
