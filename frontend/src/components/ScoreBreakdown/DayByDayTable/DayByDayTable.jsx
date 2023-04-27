import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import DayByDayTableTotalRow from "./DayByDayTableTotalRow";
import DayByDayTableRow from "./DayByDayTableRow";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTable({ scoreData, commentData }) {
  const classes = useStyles();

  const dates = [...new Set(Object.keys(scoreData).concat(Object.keys(commentData)))].sort();
  const fileExtensions = [...new Set(Object.keys(scoreData).flatMap((key) => Object.keys(scoreData[key])))];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={classes.banner}>
            <TableCell align="left" className={classes.banner}>Date</TableCell>
            {fileExtensions.map((fileExtension) => <TableCell align="left" className={classes.banner}>.{fileExtension}</TableCell>)}
            <TableCell align="left" className={classes.banner}>MR Word Count</TableCell>
            <TableCell align="left" className={classes.banner}>Issue Word Count</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.map((date) => <DayByDayTableRow date={date} scores={scoreData[date] || {}} fileExtensions={fileExtensions} commentScores={commentData[date] || {}} />)}
          <DayByDayTableTotalRow scores={scoreData} fileExtensions={fileExtensions} commentScores={commentData} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

DayByDayTable.propTypes = {
  scoreData: PropTypes.object.isRequired,
  commentData: PropTypes.object.isRequired,
}