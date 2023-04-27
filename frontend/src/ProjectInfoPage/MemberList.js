import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";

function MemberList({
  members,
  commitCountArray,
  commitScoreArray,
  MRCountArray,
  MRScoreArray,
  commentCountArray,
  commentWordCountArray,
  issueCountArray,
  issueWordCountArray,
  projectID,
  onMemberIdChange,
}) {
  const history = useHistory();
  const classes = useStyles();

  const rows = members.map((member, i) => ({
    id: i,
    studentID: members[i],
    commitCount: commitCountArray[i],
    commitScore: Math.round(commitScoreArray[i]),
    MRCount: Math.round(MRCountArray[i]),
    MRScore: Math.round(MRScoreArray[i]),
    commentCount: commentCountArray[i],
    commentWordCount: commentWordCountArray[i],
    issueCount: issueCountArray[i],
    issueWordCount: issueWordCountArray[i] ? issueWordCountArray[i] : 0,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "studentID", headerName: "Student", width: 90 },
    { field: "commitCount", headerName: "Commit count", width:130 },
    { field: "commitScore", headerName: "Commit score", width: 130},
    { field: "MRCount", headerName: "MR count", width: 100 },
    { field: "MRScore", headerName: "MR score", width: 100 },
    { field: "commentCount", headerName: "Comment count", width: 140 },
    { field: "commentWordCount", headerName: "Comment words", width: 140 },
    { field: "issueCount", headerName: "Issue count", width: 110},
    { field: "issueWordCount", headerName: "Issue words", width: 110 },
  ];

  const buttonClickHandler = (e) => {
    let studentID = e.row.studentID;
    history.push({
      pathname: `/overview/${projectID}/${studentID}/codeContribution`,
      state: { project_id: projectID, member_id: studentID },
    });
    onMemberIdChange(e.row.studentID);
  };

  return (
    <div className={classes.memberList}> 
      <h4> Please click on a student in the table below to view his/her contributions in detail. </h4>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={(e) => buttonClickHandler(e)}
        disableColumnMenu
      />
    </div>
  );
}

export default MemberList;
