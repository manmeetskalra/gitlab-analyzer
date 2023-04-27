import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
import Banner from "../Banner";
import CommentRow from "./CommentRow";
import { getGraphData } from "../../helper";
import useStyles from "../../style/CommentContributionPageStyles";
import TablePaginationActions from "../TablePaginationActions";
import InnerNavBar from "../InnerNavBar";
import { useInnerNavStyle } from "../../style/InnerNavStyle";
import ExpandAllBtn from "../ExpandAllBtn";

const CommentContributionPage = (props) => {
  const [comments, setComments] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [expandAll, setExpandAll] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);


  const { project_id, member_id } = useParams();

  const classes = useStyles(props);
  const innerNavStyle = useInnerNavStyle();

  useEffect(() => {
    const fetchData = async () => {
      const commentResult = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/comments`
          : `/project/${project_id}/member/${member_id}/comments`
      );
      setComments(commentResult.data);
      const commentCounts = getGraphData(commentResult.data, "commentDate", false);
      setGraphData(commentCounts);
    };
    fetchData()
      .then(() => {
        console.log("Successfully obtained comments");
      })
      .catch((e) => {
        console.log("Failed to obtain comments");
        console.log(e);
      });
  }, [project_id, member_id, setGraphData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <Grid container spacing={5} justify="center" alignItems="center" className={classes.container}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Banner memberName={member_id} type="commentContribution" />
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
            <InnerNavBar commentStyle={innerNavStyle.actionItemComment} />
          </Grid>

          <Grid className={classes.graph}>
            <BarChart
              data={graphData}
              barLabel1={BarChartProperties.comments.label}
              barColour1={BarChartProperties.comments.barColour}
              maintainRatio={false}
            />
          </Grid>

          <Grid item>
            <ExpandAllBtn expandAll={expandAll} setExpandAll={setExpandAll} />
          </Grid>

          <Grid item className={classes.table}>
            <TableContainer>
              <Table>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <TableHead>
                  <TableRow className={classes.head}>
                    <TableCell align="left" className={classes.headCell}>
                      Date
                    </TableCell>
                    <TableCell align="left" className={classes.headCell}>
                      MR/Issue Title
                    </TableCell>
                    <TableCell align="left" className={classes.headCell}>
                      MR/Issue Author
                    </TableCell>
                    <TableCell align="left" className={classes.headCell}>
                      Word Count
                    </TableCell>
                    <TableCell align="left" className={classes.headCell}>
                      Comment Type
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? comments.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : comments
                  ).map((comment) => (
                    <CommentRow
                      key={comment.commentId}
                      comment={comment}
                      expandAll={expandAll}
                      member_id={member_id}
                    />
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        100,
                        200,
                        { label: "All", value: -1 },
                      ]}
                      count={comments.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default CommentContributionPage;
