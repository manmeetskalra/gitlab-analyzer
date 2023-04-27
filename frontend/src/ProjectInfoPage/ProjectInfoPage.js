import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStyles } from "./ProjectInfoStyle";
import StackedBarChartCount from "./StackedBarChartCount";
import StackedBarChartScore from "./StackedBarChartScore";
import StackedBarChartWordCount from "./StackedBarChartWordCount";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader";
import useProjectNotSelected from "../components/useProjectNotSelected";

function ProjectInfoPage({
  onMemberIdChange,
  project_id,
}) {
  const [members, setMembers] = useState([]);
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [comments, setComments] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loader] = useFullPageLoader();
  const [noProjectSelected] = useProjectNotSelected();
  let commitCountArray = [];
  let MRCountArray = [];
  let commentCountArray = [];
  let issueCountArray = [];
  let commitScoreArray = [];
  let MRScoreArray = [];
  let commentWordCountArray = [];
  let issueWordCountArray = [];

  const classes = useStyles();
  const [projectId] = useState(project_id);

  useEffect(() => {
    const fetchData = async () => {
      let mrUrl = `/project/${projectId}/merge_requests`;
      let commitUrl = `/project/${projectId}/commits`;
      let memberUrl = `/project/${projectId}/members`;
      let commentUrl = `/project/${projectId}/comments`;
      let issueUrl = `/project/${projectId}/issues`;

      if (process.env.NODE_ENV === "development") {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/commits`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/merge_requests`;
        memberUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members`;
        commentUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/comments`;
        issueUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/issues`;
      }
      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl);
      const memberData = await axios.get(memberUrl);
      const commentData = await axios.get(commentUrl);
      const issueData = await axios.get(issueUrl);

      if (memberData.data === "") {
        setMembers([]);
      } else {
        setMembers(memberData.data);
      }
      setCommits(commitData.data);
      setMRs(mrData.data);
      setComments(commentData.data);
      setIssues(issueData.data);
    };

    fetchData();

    // eslint-disable-next-line
  }, []);

  members.forEach((member) => {
    let countCommit = 0;
    let countMR = 0;
    let countComment = 0;
    let countIssue = 0;
    let issueWordCount = 0;
    let commentWordCount = 0;
    let totalMRScore = 0;
    let totalCommitScore = 0;

    commits.forEach((commit) => {
      if (member === commit.author) {
        countCommit++;
        totalCommitScore += commit.score;
      }
    });

    commitCountArray.push(countCommit);
    commitScoreArray.push(totalCommitScore);

    MRs.forEach((MR) => {
      if (member === MR.author) {
        countMR++;
        totalMRScore += MR.score;
      }
    });
    MRCountArray.push(countMR);
    MRScoreArray.push(totalMRScore);

    comments.forEach((comment) => {
      if (member === comment.commenter) {
        countComment++;
        commentWordCount += comment.wordCount;
      }
    });
    commentCountArray.push(countComment);
    commentWordCountArray.push(commentWordCount);

    issues.forEach((issue) => {
      if (member === issue.author) {
        countIssue++;
        issueWordCount += issue.wordCount;
      }
    });
    issueCountArray.push(countIssue);
    issueWordCountArray.push(issueWordCount);
  });

  return (
    <div>
      <div className={classes.body}>
        <div className={classes.barChartContainer}>
          <div className={classes.barChart}>
            <StackedBarChartCount
              members={members}
              projectID={projectId}
              commitCountArray={commitCountArray}
              MRCountArray={MRCountArray}
              commentCountArray={commentCountArray}
              issueCountArray={issueCountArray}
            />
          </div>

          <div className={classes.barChart}>
            <StackedBarChartScore
              members={members}
              projectID={projectId}
              commitScoreArray={commitScoreArray}
              MRScoreArray={MRScoreArray}
              className={classes.barChart}
            />
          </div>
          <div className={classes.barChart}>
            <StackedBarChartWordCount
              members={members}
              projectID={projectId}
              commentWordCountArray={commentWordCountArray}
              issueWordCountArray={issueWordCountArray}
              className={classes.barChart}
            />
          </div>
        </div>
        <MemberList
          projectID={projectId}
          members={members}
          commitCountArray={commitCountArray}
          commitScoreArray={commitScoreArray}
          MRCountArray={MRCountArray}
          MRScoreArray={MRScoreArray}
          issueCountArray={issueCountArray}
          issueWordCountArray={issueWordCountArray}
          commentCountArray={commentCountArray}
          commentWordCountArray={commentWordCountArray}
          onMemberIdChange={onMemberIdChange}
        />
      </div>
      {loader}
      {noProjectSelected}
    </div>
  );
}

export default ProjectInfoPage;
