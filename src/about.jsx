import sparky from "./sparky.jpg";
import logo from "./logo_alt.jpg";
import "./App.css";
import React from "react";
import {
    Typography,
    Grid,
    Card,
} from "@mui/material";


export default function About() {

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "93vh" }}
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
                        xs={12}
                        md={4}
                        sx={{
                            pb: 2,
                        }}
                    >
                        <img width={260} src={sparky} alt="sparky" />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            display="block"
                            variant="subtitle"
                            align="center">
                            Hi, I'm Jackie. This is Sparky up above.<br /> I create this page to have a place where I can search for foods my dog can eat.<br /> I am currently working on an app version in both iOS and Android so stay tuned!
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}

