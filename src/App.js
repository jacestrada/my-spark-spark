import logo from "./logo_alt.jpg";
import background from "./background.jpg";
import "./App.css";
import myData from './api/data.json';
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Autocomplete,
  TextField,
  Typography,
  Divider,
  Link,
} from "@mui/material";

export default function App() {
  const [eatable, setBool] = useState("");
  const [source, setSource] = useState("");
  const [foods, setFoods] = useState([]);

  const onChangeSelected = (e, value) => {
    if (value != null) {
      setSource(value.Food_Source);
      setBool(value.Food_Bool);
    }

  };

  useEffect(() => {
    setFoods(myData);
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      sx={{
        display: "flex",
        backgroundImage: `url(${background})`,
      }}
    >
      <Card
        sx={{
          p: 1,
          mt: 5,
        }}
      >
        <Grid container direction="column">
          <Grid
            item
            xs={12}
            sx={{
              pb: 2,
            }}
          >
            <img width={360} src={logo} alt="logo" />
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              ml: 1,
              pb: 2,
            }}
          >
            <label>Search for a food to see if your dog can eat it </label>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              mx: 4,
              pb: 4,
            }}
          >
            <Autocomplete
              options={foods}
              onChange={onChangeSelected}
              getOptionLabel={(foods) => foods.Food}
              isOptionEqualToValue={(option, value) => foods.id === value.id}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </Grid>

          <Grid
            sx={{
              pb: 4,
            }}
            container
            justifyContent="center"
            spacing={2}
          ></Grid>

          {eatable !== "" ? (
            <>
              <Divider />
              <Grid width={360} container alignContent="center">
                <Grid
                  item
                  xs={3}
                  sx={{
                    pt: 5,
                  }}
                >
                  <Typography
                    className={eatable === "Yes" ? "textYes" : "textNo"}
                    variant="h3"
                  >
                    {eatable}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="button" display="block">
                    Source:
                  </Typography>
                  <Link target="_blank" href={source} variant="body2">
                    <p>{source}</p>
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Card>
    </Grid>
  );
}
