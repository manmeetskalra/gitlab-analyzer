import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import Banner from "../Banner";
import DayByDayTable from "./DayByDayTable/DayByDayTable";
import {useStyles} from "../../style/ScoreBreakdownStyles";
import axios from "axios";

const ScoreBreakdown = () => {
  const { project_id, member_id } = useParams();
  const [codeScoreByDate, setCodeScoreByDate] = useState(null);
  const [commentScoreByDate, setCommentScoreByDate] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchCommitData = async () => {
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;

      if (process.env.NODE_ENV === "development") {
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`;
      }

      const { data } = await axios.get(commitUrl);

      return data;
    };

    const parseCommitData = (data) => {
      const dateMap = {};

      data.forEach((commit) => {
        const date = commit.commitDate.slice(0, 10)
        if (!dateMap[date]) {
          dateMap[date] = {};
        }

        commit.diffs.forEach((diffStr) => {
          const diff = JSON.parse(diffStr);

          if (diff.score === 0) return;

          const fileExtension = diff.new_path.split('.').reverse()[0];

          if (!dateMap[date][fileExtension]) {
            dateMap[date][fileExtension] = 0;
          }
          dateMap[date][fileExtension] += diff.score;
        });
      });
      setCodeScoreByDate(dateMap);
    }

    setCodeScoreByDate(null);
    fetchCommitData().then(parseCommitData);
  }, [project_id, member_id]);


  useEffect(() => {
    const fetchCommentData = async () => {
      let commitUrl = `/project/${project_id}/member/${member_id}/comments`;

      if (process.env.NODE_ENV === "development") {
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/comments`;
      }

      const { data } = await axios.get(commitUrl);
      console.log(data);

      return data;
    };

    const parseCommentData = (data) => {
      const dateMap = {};

      data.forEach((comment) => {
        const date = comment.commentDate.slice(0, 10)
        if (!dateMap[date]) {
          dateMap[date] = {};
        }

        if (!dateMap[date][comment.commentType]) {
          dateMap[date][comment.commentType] = 0;
        }
        dateMap[date][comment.commentType] += comment.wordCount;
      });
      setCommentScoreByDate(dateMap);
    }

    fetchCommentData().then(parseCommentData);
  }, [project_id, member_id]);


  return (
    <Grid container spacing={5} justify="center" alignItems="center" className={classes.container}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Banner memberName={member_id} />
        </Grid>
      </Grid>
      <Grid item className={classes.table}>
        {(codeScoreByDate == null || commentScoreByDate == null) && <p>Loading...</p>}
        {codeScoreByDate != null && commentScoreByDate != null && <DayByDayTable scoreData={codeScoreByDate} commentData={commentScoreByDate}/>}
      </Grid>
    </Grid>
  );
};

export default ScoreBreakdown;
