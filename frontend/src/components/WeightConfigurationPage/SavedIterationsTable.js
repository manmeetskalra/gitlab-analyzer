import {
    TableCell,
    TableRow,
    Button,
  } from "@material-ui/core";
import React from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 

const Row = (props) => {
    const classes = useStyles();
    const {row, deleteRow, handleIterationName, handleIterationStartDate, handleIterationEndDate} = props;
    const handleDelete = () => {
        deleteRow(row.id)
    }

    const handleSetIteration = () => {
      console.log(row);
      handleIterationName(row.iterationName);
      handleIterationStartDate(row.startDate);
      handleIterationEndDate(row.endDate);
    }

    return (
        <TableRow key={row.name} hover={true}>
            <TableCell align="center">{row.iterationName}</TableCell>
            <TableCell align="center">{row.startDate}</TableCell>
            <TableCell align="center">{row.endDate}</TableCell>
            <TableCell align="center">
                <Button variant="contained" component="span" className={classes.deleteButton} onClick={handleDelete} size="small">Delete</Button>
                <Button variant="contained" component="span" className={classes.applyButton} onClick={handleSetIteration} size="small">Select</Button>
            </TableCell>
        </TableRow>
    )
}

export default Row;