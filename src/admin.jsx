import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Dialog, Paper, TableRow, TableHead, TableContainer, TableBody, Table, Button, TextField, DialogContent, DialogActions } from '@mui/material';
import { db } from "./config";
import { ref, onValue, remove, set } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: "bold"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function CustomizedTables(adminBool) {
    const [foods, setFoods] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [foodName, setFoodName] = useState('')
    const [foodBool, setFoodBool] = useState('')
    const [foodSource, setFoodSource] = useState('')

    useEffect(() => {
        getTableData()
        // eslint-disable-next-line
    }, [adminBool]);

    function getTableData() {
        const suggestedRef = ref(db, 'Suggestions/');
        onValue(suggestedRef, (snapshot) => {
            const data = snapshot.val()
            if (data === null) {
                setFoods([])
                return
            }
            const newFoods = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            setFoods(newFoods)
        })
    }

    async function dataAdd() {
        await set(ref(db, 'Foods/' + foodName), {
            Food: foodName,
            Food_Bool: foodBool,
            Food_Source: foodSource
        })
        await remove(ref(db, 'Suggestions/' + foodName)).then(() => {
            setFoodName('')
            setFoodBool('')
            setFoodSource('')
            handleClose()
            getTableData()
        })
            .catch((error) => {
                console.log(error.message)
            })

    }

    async function deleteData() {
        await remove(ref(db, 'Suggestions/' + foodName)).then(() => {
        })
            .catch((error) => {
                console.log(error.message)
            })
        getTableData()
    }
    const handleClickOpen = (food) => {
        setOpen(true);
        setFoodName(food)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <TableContainer component={Paper}>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="foodName"
                        label="Food Name"
                        fullWidth
                        variant="outlined"
                        value={foodName}
                        onChange={(event) => {
                            setFoodName(event.target.value);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="foodBool"
                        label="Food Bool"
                        fullWidth
                        variant="outlined"
                        value={foodBool}
                        onChange={(event) => {
                            setFoodBool(event.target.value);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="foodSource"
                        label="Food Source"
                        fullWidth
                        variant="outlined"
                        value={foodSource}
                        onChange={(event) => {
                            setFoodSource(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">Cancel</Button>
                    <Button onClick={dataAdd} variant="contained" color="success">Submit</Button>
                </DialogActions>
            </Dialog>
            {foods.length > 0 ? (<Table sx={{ maxWidth: 1200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Foods Pending</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {foods.map((row) => (
                        <StyledTableRow key={row.foodName}>
                            <StyledTableCell component="th" scope="row">
                                {row.foodName}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.date}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Button onClick={() => handleClickOpen(row.foodName)} color="success" variant="contained" startIcon={<AddIcon />}>
                                    Add
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Button onClick={() => deleteData(row.foodName)} color="error" variant="contained" startIcon={<DeleteForeverIcon />}>
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>) : null}
        </TableContainer >
    );
}