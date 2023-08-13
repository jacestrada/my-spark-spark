import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from "./config";
import { ref, onValue, remove } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

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

    useEffect(() => {
        getTableData()
        // eslint-disable-next-line
    }, [adminBool]);

    function getTableData() {
        const starCountRef = ref(db, 'Suggestions/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            const newFoods = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            setFoods(newFoods)
        })

    }

    function deleteData(foodName) {
        remove(ref(db, 'Suggestions/' + foodName)).then(() => {
            console.log("removed")
        })
            .catch((error) => {
                console.log(error.message)
            })
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Foods Pending</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {foods.map((row, index) => (
                        <StyledTableRow key={row.foodName}>
                            <StyledTableCell component="th" scope="row">
                                {row.foodName}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.date}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Button color="success" variant="contained" startIcon={<AddIcon />}>
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
            </Table>
        </TableContainer >
    );
}