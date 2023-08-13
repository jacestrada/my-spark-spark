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
    Card,
    TextField,
    Button
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
            justify="center"
            style={{ minHeight: "93vh" }}
        >
            {open && (
                <Alert severity={severity} onClose={handleAlertClose}>
                    {message}
                </Alert>
            )}
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
                    <p>Type a food name that you would like to be added to our database</p>
                    <TextField
                        name="foodName"
                        variant="outlined"
                        fullWidth
                        id="foodName"
                        label="Food Name"
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

