import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SearchIcon from "@material-ui/icons/Search";
import Scores from "../components/Scores";
import useStyles from "../style/ScoreBoardStyles";
import useClipboard from "react-use-clipboard";

const ScoreBoard = (props) => {
  const classes = useStyles(props);
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [comments, setComments] = useState([]);
  const [issues, setIssues] = useState([]);
  const { project_id, member_id } = useParams();
  let MRCount = MRs.length;
  let commitCount = commits.length;
  let commentCount = comments.length;
  let issueCount = issues.length;
  let issueWordCount = 0;
  let commentWordCount = 0;
  let totalMRScore = 0;
  let totalCommitScore = 0;

  useEffect(() => {
    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/member/${member_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;
      let commentUrl = `/project/${project_id}/${member_id}/comments`;
      let issueUrl = `/project/${project_id}/${member_id}/issues`;

      if (process.env.NODE_ENV === "development") {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/merge_requests`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`;
        commentUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/comments`;
        issueUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/issues`;
      }
      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl);
      const commentData = await axios.get(commentUrl);
      const issueData = await axios.get(issueUrl);

      setMRs(mrData.data);
      setCommits(commitData.data);
      setComments(commentData.data);
      setIssues(issueData.data);
    };
    fetchData()
      .then(() => {
        console.log("Obtained MR and Issue Counts");
      })
      .catch(() => {
        console.log("Failed to get counts");
      });
  }, [project_id, member_id]);

  issues.forEach((issue) => {
    issueWordCount += issue.wordCount;
  });

  comments.forEach((comment) => {
    commentWordCount += comment.wordCount;
  });

  MRs.forEach((MR) => {
    totalMRScore += MR.score;
  });

  commits.forEach((commit) => {
    totalCommitScore += commit.score*-1;
  });

  totalMRScore = Math.round(totalMRScore);
  totalCommitScore = Math.round(totalCommitScore);

  const score_summary =
    "Number of commits: " +
    commitCount +
    "; Total commit score: " +
    totalCommitScore +
    "; Number of MRs: " +
    MRCount +
    "; Total MR score: " +
    totalMRScore +
    "; Comment count: " +
    commentCount +
    "; Comment Word Count: " +
    commentWordCount +
    "; Issue count: " +
    issueCount +
    "; Issue word count: " +
    issueWordCount +
    ";";

  const [isCopied, setCopied] = useClipboard(score_summary);
  console.log(isCopied)
  return (
    <Grid container spacing={10} className={classes.scoreboardContainer}>
      <Grid item lg={6} md={6} sm={6} className={classes.cards}>
        <Scores
          totalMRScore={totalMRScore}
          MRCount = {MRCount}
          totalCommitScore={totalCommitScore}
          commitCount={commitCount}
          issueWordCount={issueWordCount}
          commentWordCount={commentWordCount}
          issueCount={issueCount}
          commentCount={commentCount}
        />
      </Grid>

      <Grid item lg={6} md={6} sm={6}>
        <Grid item className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to={`/overview/${project_id}/${member_id}/breakdown`}
          >
            Score Breakdown <SearchIcon className={classes.icon} />
          </Button>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={setCopied}
          >
            Copy Scores <FileCopyIcon className={classes.icon} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
