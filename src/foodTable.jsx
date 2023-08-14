import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Paper, TableRow, TableHead, TableContainer, TableBody, Table, Button } from '@mui/material';
import { db } from "./config";
import { ref, onValue, remove } from 'firebase/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
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


export default function CustomizedFoodTables(adminBool) {
    const [foodList, setFoodList] = useState([])

    useEffect(() => {
        getFoodList()
        // eslint-disable-next-line
    }, [adminBool]);

    function getFoodList() {
        const foodRef = ref(db, 'Foods/');
        onValue(foodRef, (snapshot) => {
            const data = snapshot.val()
            const newFoods = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            setFoodList(newFoods)
        })

    }

    function deleteData(foodName) {
        remove(ref(db, 'Foods/' + foodName)).then(() => {
        })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <TableContainer component={Paper}>
            {foodList != null ? (<Table sx={{ maxWidth: 800 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Foods </StyledTableCell>
                        <StyledTableCell>Bool</StyledTableCell>
                        <StyledTableCell >Source</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {foodList.map((row, index) => (
                        <StyledTableRow key={row.Food}>
                            <StyledTableCell component="th" scope="row">
                                {row.Food}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.Food_Bool}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.Food_Source}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <Button onClick={() => deleteData(row.Food)} color="error" variant="contained" startIcon={<DeleteForeverIcon />}>
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