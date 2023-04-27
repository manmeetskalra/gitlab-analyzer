import {TableCell, TableRow} from "@material-ui/core";
import {formatTableDate} from "../../../helper";
import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTableRow({ date, scores, fileExtensions, commentScores }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}>{formatTableDate(date, false)}</TableCell>
      {fileExtensions.map((key) => <TableCell className={classes.cell}>{scores[key]?.toFixed(1) || 0}</TableCell>)}
      <TableCell className={classes.cell}>{commentScores.MergeRequest || 0}</TableCell>
      <TableCell className={classes.cell}>{commentScores.Issue || 0}</TableCell>
    </TableRow>
  )
}

DayByDayTableRow.propTypes = {
  date: PropTypes.string.isRequired,
  fileExtensions: PropTypes.array.isRequired,
  scores: PropTypes.object.isRequired,
  commentScores: PropTypes.object.isRequired,
};
