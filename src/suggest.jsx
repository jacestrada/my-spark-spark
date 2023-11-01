import logo from "./logo_alt.jpg";
import "./App.css";
import { db } from "./config";
import { ref, set, onValue } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import React, { useState } from "react";
import {
    Alert,
    Grid,
    // Card,
    TextField,
    Button,
    Typography
} from "@mui/material";


export default function Suggest() {
    const [foodName, setFoodName] = useState('')
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("success")

    function dataAdd() {
        const foodRef = ref(db, 'Suggestions/');
        onValue(foodRef, (snapshot) => {
            if (snapshot.hasChild(foodName)) {
                setSeverity("error")
                setMessage("The food item is already in review")
                setOpen(true)
            } else {
                set(ref(db, 'Suggestions/' + foodName), {
                    foodName: foodName,
                    date: new Date().toLocaleString(),
                })
                setFoodName('')
                setMessage("The food item has been submitted for review.")
                setOpen(true)
                setSeverity("success")
            }
        });

    }

    function handleAlertClose() {
        setOpen(false);

    }
    setTimeout(handleAlertClose, 9000);

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            style={{ minHeight: "93vh" }}
        >
            {open && (
                <Alert severity={severity} onClose={handleAlertClose}>
                    {message}
                </Alert>
            )}
            <Grid container direction="row"
                justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sx={{
                        pb: 1,
                    }}
                >
                    <img width={360} src={logo} alt="logo" />
                </Grid>
                <Typography
                    display="block"
                    variant="subtitle"
                    sx={{
                        pb: 2,
                    }}
                    align="center">
                    Make a food suggestion!<br /> Check back to see if it's been approved.
                </Typography>
            </Grid>
            <Grid container direction="row"
                justifyContent="center">
                <TextField
                    name="foodName"
                    variant="outlined"
                    sx={{ width: 350, pb: 1 }}
                    id="foodName"
                    label="Food Name"
                    value={foodName}
                    onChange={(event) => {
                        setFoodName(event.target.value);
                    }}
                />
            </Grid>
            <Grid container direction="row"
                justifyContent="center">
                <Button
                    type="submit"
                    sx={{ width: 350 }}
                    variant="contained"
                    color="primary"
                    onClick={dataAdd}
                >
                    Submit
                </Button>
            </Grid>

        </Grid>
    );
}

