
import background from "./background.jpg";
import "./App.css";
// import { db } from "./config";
// import { ref, onValue } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import React, { useState } from "react";
import {
    Grid,
    Card,
} from "@mui/material";


export default function App() {

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
                    Under Construction
                </Grid>
            </Card>
        </Grid>
    );
}
