import CodeContributionTable from "./CodeContributionTable";
import { Grid, Switch } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
import { useGraphStyles, useSwitchStyles } from "../../style/CodeContributionPageStyles";
import InnerNavBar from "../InnerNavBar";
import { useInnerNavStyle } from "../../style/InnerNavStyle";
import { getGraphData, makeCommitGraphData, makeMRGraphData, mergeGraphData } from "../../helper";
import { makeCodeContributionTableData } from "../../helper";
import useProjectNotSelected from "../../components/useProjectNotSelected";


const CodeContributionPage = (props) => {
  const [codeContributionRows, setCodeContributionRows] = useState([]);
  const classes = useGraphStyles();
  const innerNavStyle = useInnerNavStyle();
  const switchStyle = useSwitchStyles();
  const [countsData, setCountsData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [project_id, setProjectId] = useState(props.project_id);
  const [member_id, setMemberId] = useState(props.member_id);
  const [scoreMode, setScoreMode] = useState(false);
  const [noProjectSelected, showErrorPage] = useProjectNotSelected();

  useEffect(() => {
    const setProjectIdAndMemberId = () => {
      if (project_id === -1 || project_id === ':project_id' || member_id === -1 || member_id === ':member_id') {
        showErrorPage();
      } else {
        setProjectId(props.project_id);
        setMemberId(props.member_id);
      }
    };

    const codeContributionData = (commitData, mrData) => {
      let mrArray = [];
      let commitCountsData = [];
      let commitScoresData = [];
      let mrCountsData = [];
      let mrScoresData = [];


      makeCodeContributionTableData(mrData, mrArray, commitData);

      const commitCounts = getGraphData(commitData, "commitDate", false);
      const mrCounts = getGraphData(mrData, "mergedAt", false);
      const commitScores = getGraphData(commitData, "commitDate", true);
      const mrScores = getGraphData(mrData, "mergedAt", true);

      makeCommitGraphData(commitCounts, commitCountsData);
      makeCommitGraphData(commitScores, commitScoresData);
      makeMRGraphData(mrCounts, mrCountsData);
      makeMRGraphData(mrScores, mrScoresData);

      const ccCountsData = mergeGraphData(commitCountsData, mrCountsData);
      const ccScoreData = mergeGraphData(commitScoresData, mrScoresData);
      setCountsData(ccCountsData);
      setScoreData(ccScoreData);
      setGraphData(ccScoreData);

      let ccArray = mrArray;
      ccArray.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
      });

      setCodeContributionRows(ccArray);
    };

    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/member/${member_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;

      if (process.env.NODE_ENV === "development") {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/merge_requests`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`;
      }

      const resultCommit = await axios.get(commitUrl);
      const resultMR = await axios.get(mrUrl);
      const commitData = resultCommit.data;
      const mrData = resultMR.data;

      codeContributionData(commitData, mrData);
    };
    setProjectIdAndMemberId();

    if (member_id !== -1) {
      fetchData()
        .then(() => {
          console.log("Successful data retrieval");
        })
        .catch(() => {
          console.log("Failed retrieve data");
        });
    }
    // eslint-disable-next-line
  }, [project_id, member_id, props]);

  const handleSwitch = (event) => {
    setScoreMode(event.target.checked);
    scoreMode ? setGraphData(scoreData) : setGraphData(countsData);
  }

  return (
    <div>
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Banner memberName={member_id} type="codecontribution"
                    />
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
            <InnerNavBar codeStyle={innerNavStyle.actionItemCode} />
          </Grid>

          <Grid className={classes.graph}>
            <Switch
              classes={switchStyle}
              checked={scoreMode}
              onChange={handleSwitch}
              name='graphSwitch'
              />

            <BarChart
              data={graphData}
              codeContribution={true}
              barLabel1={BarChartProperties.codeContribution.labelMRs}
              barColour1={BarChartProperties.codeContribution.barColourMRs}
              barLabel2={BarChartProperties.codeContribution.labelCommits}
              barColour2={BarChartProperties.codeContribution.barColourCommits}
              maintainRatio={false}
            />
          </Grid>
          <Grid item className={classes.table}>
            <CodeContributionTable
              codeContributionRows={codeContributionRows} />
          </Grid>
        </Grid>
      </Grid>
      {noProjectSelected}
    </div>
  );
};

export default CodeContributionPage;
