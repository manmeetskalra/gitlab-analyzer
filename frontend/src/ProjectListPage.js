import { Button, Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style/projectList.module.css";
import { useStyles } from "./style/ProjectListPageStyle";
import useFullPageLoader from "./components/useFullPageLoader";
import {formatDate} from "./helper";

const ProjectListPage = (props) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [projectIdArray, setProjectIdArray] = useState([]);
  const [syncDone, setSyncDone] = useState(false);
  const UNSYNCED = "1974-01-01T00:00Z";

  const syncProject = async (projectId) => {
    await axios.post(
      process.env.NODE_ENV === "development"
        ? `${process.env.REACT_APP_DEVHOST}/project/${projectId}/load`
        : `/project/${projectId}/load`
    )
    .then((response) => {
      const r = rows.map(r => {
        if (r.id === response.data.repoId) {
          r.lastSync = formatDate(response.data.lastSync);
        }
        return r;
      })
      setRows(r)
    });
  };

  const SyncButton = () => {
    const [snackBar, setSnackBar] = useState(false);

    const handleClick = () => {
      const projectsToSync = projectIdArray;
      setSnackBar(true);
      Promise.all(
        projectsToSync.map((projectId) => syncProject(projectId))
      )
      .then((value) => {
        console.log("syncing done")
        setSyncDone(true)
      });
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setSnackBar(false);
    };

    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            position: "absolute",
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackBar}
          onClose={handleClose}
          autoHideDuration={3000}
          message="Sync started"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.syncButton}
          onClick={handleClick}
        >
          Sync Now
        </Button>
      </React.Fragment>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "projectName", headerName: "Project Name", width: 400 },
    { field: "lastSync", headerName: "Last Sync", width: 400 },
  ];

  const [allProjects, setAllProjects] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      const result = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_DEVHOST}/project/all/projectList`
          : "/project/all/projectList"
      );

      const resultSavedProjects = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_DEVHOST}/project/all`
          : "/project/all"
      );

      setAllProjects(result.data);
      setSavedProjects(resultSavedProjects.data);
      const tempRows = allProjects.map((project) =>
        deStringProjectResponse(project)
      );
      setRows(tempRows);
      setFetched(true);
    };

    const runFetchData = async () => {
      if (!fetched) {
        await fetchData();
      } else {
        hideLoader();
      }
    };
    runFetchData();
    // eslint-disable-next-line
  }, [rows]);

  

  const deStringProjectResponse = (project) => {
    const json = JSON.parse(project);
    const matchingProject = savedProjects.filter(
      (param) => param.repoId === json.id
    );
    if (matchingProject[0].lastSync === UNSYNCED) {
      json["lastSync"] = "Never";
    } else {
      json["lastSync"] = formatDate(matchingProject[0].lastSync);
    }
    return {
      id: json.id,
      projectName: json.name,
      lastSync: json.lastSync,
    };
  };

  const getValue = (e) => {
    setProjectIdArray(e.selectionModel);
  };

  const buttonClickHandler = () => {
    let projectName;
    let projectLastSync

    if (projectIdArray.length === 0) {
      setErrorMsg("You have not selected any projects!");
    } else if (projectIdArray.length === 1) {
      rows.forEach((project) => {
        if (project.id === parseInt(projectIdArray[0])) {
          console.log(project.projectName);
          projectName = project.projectName;
          projectLastSync = project.lastSync;
        }
      });

      if (projectLastSync === "Never") {
        setErrorMsg("You must sync this project first!");
      }
      else {
        props.onProjectIdChange(projectIdArray[0]);

        history.push({
          pathname: "/projectInfo/" + projectIdArray[0],
          state: { id: projectIdArray[0], projectName: projectName },
        });
      }
    } else {
      setErrorMsg("Please choose a single project!")
    }
  };

  const closeSyncDoneSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSyncDone(false);
  } 

  return (
    <div>
      <div className={styles.projectList}>
        <div style={{ display: "flex", height: "100%", marginTop: "5%" }}>
          <div style={{ flexGrow: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              checkboxSelection
              onSelectionModelChange={(e) => getValue(e)}
            />
          </div>
        </div>
      </div>
      <h3 className={classes.errorMsg}>{errorMsg}</h3>

      <Button
        id="select-project"
        variant="contained"
        color="primary"
        className={classes.nextButton}
        onClick={buttonClickHandler}
      >
        Next
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.batchButton}
      >
        Batch Process
      </Button>
      <SyncButton />
      <Snackbar
          anchorOrigin={{
            position: "absolute",
            vertical: "bottom",
            horizontal: "left",
          }}
          open={syncDone}
          onClose={closeSyncDoneSnackBar}
          autoHideDuration={3000}
          message="Sync Complete"
        />
      {loader}
    </div>
  );
};

export default ProjectListPage;
