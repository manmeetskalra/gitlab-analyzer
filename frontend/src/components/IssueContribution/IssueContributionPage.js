import {
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody, 
} from "@material-ui/core";
import Banner from "../Banner";
import React, {useEffect, useState} from "react";
import useStyles from "../../style/IssueContributionPageStyles";
import Row from "./IssueTableDropDown";
import axios from "axios";
import {getGraphData} from "../../helper";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
import {useParams} from "react-router";
import InnerNavBar from "../InnerNavBar";
import {useInnerNavStyle} from "../../style/InnerNavStyle"
import ExpandAllBtn from "../ExpandAllBtn"; 

const IssueContributionPage = () => {
    const classes = useStyles();
    const [expandAll, setExpandAll] = React.useState(false);
    const [issues, setIssues] = useState([]); 
    const [graphData, setGraphData] = useState([]);
    const {project_id, member_id} = useParams();
    const innerNavStyle = useInnerNavStyle();

  useEffect(() => {
    const fetchData = async () => {
      const issueResult = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/issues`
          : `/project/${project_id}/member/${member_id}/issues`
      );
      setIssues(issueResult.data);
      const issueCounts = getGraphData(issueResult.data, "openedDate", false);
      setGraphData(issueCounts);
    };
    fetchData()
      .then(() => {
        console.log("Successfully obtained issues");
      })
      .catch((e) => {
        console.log("Failed to obtain issues");
        console.log(e);
      });
  }, [project_id, member_id, setGraphData]);

  return (
    <Grid container spacing={5} justify="center" alignItems="center" className={classes.container}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Banner memberName={member_id} type="issueContribution" />
        </Grid>
      </Grid>
      <Grid
          container
          spacing={5}
          justify="center"
          alignItems="center"
          className={classes.contents}
        >
      <Grid item xs={12} align="center">
        <InnerNavBar issueStyle={innerNavStyle.actionItemIssue} />
      </Grid>

      <Grid className={classes.graph}>
        <BarChart
          data={graphData}
          barLabel1={BarChartProperties.issues.label}
          barColour1={BarChartProperties.issues.barColour}
          maintainRatio={false}
        />
      </Grid>
      <Grid item>
        <ExpandAllBtn expandAll={expandAll} setExpandAll={setExpandAll}/>
      </Grid>

      <Grid item className={classes.table}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell className={classes.headCell} align="left">
                  Date
                </TableCell>
                <TableCell className={classes.headCell} align="left">
                  Issue
                </TableCell>
                <TableCell className={classes.headCell} align="left">
                  Note
                </TableCell>
                <TableCell className={classes.dropDownColumn} align="left" />
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <Row key={issue.issueId} row={issue} expandAll={expandAll} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default IssueContributionPage;
