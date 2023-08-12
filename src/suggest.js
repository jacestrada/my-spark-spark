
import background from "./background.jpg";
import "./App.css";
import { db } from "./config";
import { ref, set } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import React, { useState } from "react";
import {
    Alert,
    Grid,
    Card,
    TextField,
    Button
} from "@mui/material";


export default function App() {
    const [foodName, setFoodName] = useState('')
    const [open, setOpen] = useState(true);

    function dataAdd() {
        set(ref(db, 'Suggestions/' + foodName), {
            foodName: foodName
        })
        setFoodName('')
        setOpen(true)
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
            justify="center"
            style={{ minHeight: "100vh" }}
            sx={{
                display: "flex",
                backgroundImage: `url(${background})`,
            }}
        >
            {open && (
                <Alert severity="success" onClose={handleAlertClose}>
                    The food item has been submitted for review.
                </Alert>
            )}
            <Card
                sx={{
                    p: 1,
                    mt: 5,
                }}
            >
                <Grid container direction="column">
                    <p>Type a food name that you would like to be added to our database</p>
                    <TextField
                        name="foodName"
                        variant="outlined"
                        fullWidth
                        id="foodName"
                        label="Food Name"
                        autoFocus
                        value={foodName}
                        onChange={(event) => {
                            setFoodName(event.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={dataAdd}
                    >
                        Submit
                    </Button>
                </Grid>
            </Card>
        </Grid>
    );
}

