import React from "react";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import useStyles from "../style/ScoreStyles";

const Scores = (props) => {
  let {
    totalMRScore,
    MRCount,
    totalCommitScore,
    commitCount,
    commentCount,
    commentWordCount,
    issueCount,
    issueWordcount,
  } = props;
  const classes = useStyles(props);

  return (
    <Grid container className={classes.scoreContainer}>
      <Grid item lg={3} md={3} sm={2} className={classes.score}>
        <p className={classes.title}>Total Commit</p>
        <Divider />
        <p>{commitCount ? commitCount : "N/A"} commits <br />{totalCommitScore ? -1 * totalCommitScore : "N/A"} points</p>
      </Grid>

      <Grid item lg={3} md={3} sm={2} className={classes.score}>
        <p className={classes.title}>Total MR</p>
        <Divider />
        <p>{MRCount ? MRCount : "N/A"} MRs <br />{totalMRScore ? totalMRScore : "N/A"} points</p>
      </Grid>

      <Grid item lg={3} md={3} sm={2} className={classes.score}>
        <p className={classes.title}>Comments</p>
        <Divider />
        <p>
          {commentCount ? commentCount : "N/A"} comments <br />
          {commentWordCount ? commentWordCount : "N/A"} words
        </p>
      </Grid>

      <Grid item lg={3} md={3} sm={2} className={classes.score}>
        <p className={classes.title}>Issues</p>
        <Divider />
        <p>
          {issueCount ? issueCount : "N/A"} issues <br />
          {issueWordcount ? issueWordcount : "N/A"} words{" "}
        </p>
      </Grid>
    </Grid>
  );
};

export default Scores;
