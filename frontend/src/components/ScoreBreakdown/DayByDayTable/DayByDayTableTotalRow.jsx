import {TableCell, TableRow} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTableTotalRow({ scores, fileExtensions, commentScores }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}><b>Total</b></TableCell>
      {fileExtensions.map(fileExtension => {
        const extensionScoreSum = Object.keys(scores).map((key) => scores[key][fileExtension]|| 0).reduce((a, b) => a + b, 0).toFixed(1);
        return <TableCell className={classes.cell}><b>{extensionScoreSum}</b></TableCell>;
      })}
      <TableCell className={classes.cell}><b>{Object.keys(commentScores).map(key => commentScores[key].MergeRequest || 0).reduce((a, b) => a + b, 0)}</b></TableCell>
      <TableCell className={classes.cell}><b>{Object.keys(commentScores).map(key => commentScores[key].Issue || 0).reduce((a, b) => a + b, 0)}</b></TableCell>
    </TableRow>
  )
}

DayByDayTableTotalRow.propTypes = {
  scores: PropTypes.object.isRequired,
  fileExtensions: PropTypes.array.isRequired,
  commentScores: PropTypes.number.isRequired,
};
