import logo from "./logo_alt.jpg";
import background from "./background.jpg";
import "./App.css";
import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  Autocomplete,
  TextField,
  Typography,
  Divider,
  Link,
} from "@mui/material";

export default function App() {
  const defaultProps = {
    options: Foods,
    getOptionLabel: (option) => option.name,
  };
  const [eatable, setBool] = useState("");
  const [source] = useState(
    "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-popcorn/#:~:text=Plain%2C%20air%2Dpopped%20popcorn%20is,probably%20won't%20hurt%20him."
  );

  return (
    <Grid
      container
      spacing={0}
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
          p: 2,
          mt: 5,
          maxWidth: 400,
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
            <header>
              <img width={400} src={logo} alt="logo" />
            </header>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              ml: 4,
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
              {...defaultProps}
              renderInput={(params) => (
                <TextField {...params} l variant="standard" />
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
          >
            <Grid item xs={4}>
              <Button
                onClick={() => setBool("No")}
                fullWidth
                variant="contained"
              >
                Search
              </Button>
            </Grid>
          </Grid>

          {eatable !== "" ? (
            <>
              <Divider />
              <Grid container alignContent="center">
                <Grid
                  item
                  xs={3}
                  sx={{
                    pt: 5,
                  }}
                >
                  <Typography
                    className={eatable == "Yes" ? "textYes" : "textNo"}
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

const Foods = [
  { name: "Plain Popcorn", bool: "Yes" },
  { name: "Butter Popcorn", bool: "No" },
  { name: "Grapes", bool: "No" },
];
