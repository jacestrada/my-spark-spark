import logo from "./logo_alt.jpg";
import "./App.css";
import { db } from "./config";
import { ref, onValue } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import React, { useState, useEffect } from "react";

import {
    Alert,
    Snackbar,
    Grid,
    // Card,
    Autocomplete,
    TextField,
    Typography,
    Divider,
    Link,
} from "@mui/material";

export default function Home() {
    const [eatable, setBool] = useState("");
    const [source, setSource] = useState("");
    const [foods, setFoods] = useState([]);
    const [open, setOpen] = useState(true);

    const onChangeSelected = (_e, value) => {
        if (value != null) {
            setSource(value.Food_Source);
            setBool(value.Food_Bool);
        }
    };

    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        const foodRef = ref(db, 'Foods/');
        onValue(foodRef, (snapshot) => {
            const data = snapshot.val()
            const newFoods = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            setFoods(newFoods)
        })

    }, []);

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "93vh" }} >
            {open && (
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    sx={{ bottom: { xs: 90, sm: 0, }, }}
                >
                    <Alert severity="info" onClose={handleClose}>
                        Welcome! Food options will be updated weekly.
                    </Alert>
                </Snackbar>
            )}
            <Grid container direction="row"
                justifyContent="center">
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        pb: 2,
                    }}>
                    <img width={360} src={logo} alt="logo" />
                    <Typography
                        display="block"
                        variant="subtitle"
                        align="center">
                        Search the online database of for food that your dog can eat!
                    </Typography>
                </Grid>
                <Grid container direction="row"
                    justifyContent="center">
                    <Autocomplete
                        sx={{ width: 350 }}
                        options={foods}
                        onChange={onChangeSelected}
                        getOptionLabel={(foods) => foods.Food}
                        isOptionEqualToValue={(_option, value) => foods.key === value.key}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                        )} />
                </Grid>
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
                                    <p target="_blank" href={source}>{source}</p>
                                </Link>
                            </Grid>
                        </Grid>
                    </>
                ) : null}
            </Grid>
        </Grid>
    );
}
