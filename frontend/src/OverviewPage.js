import Banner from "./components/Banner";
import Charts from "./components/Charts/Charts";
import DataFetching from "./components/DataFetching";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
}));

const OverviewPage = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const {member_id} = props.member_id===-1? useParams():props.member_id;

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <Banner memberName={member_id}/>
        </Grid>
      </Grid>
      <Grid container>
        <Charts />
      </Grid>
      <DataFetching />
    </Grid>
  );
}

export default OverviewPage;
