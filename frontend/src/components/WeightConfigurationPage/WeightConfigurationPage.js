import {
    Button,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
  } from "@material-ui/core";
import React, {useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import Row from "./SavedIterationsTable";
import axios from "axios";
import Calendar from "../Calendar";
import CreateFileTypeWeightInput from "./CreateFileTypeWeightInput";
import moment from 'moment';

const WeightConfigurationPage 
  = ({token, startDate, endDate, handleStartDate, handleEndDate, handleIterationName, handleIterationStartDate, handleIterationEndDate, project_id}) => {
    const classes = useStyles();
    const [fileType, setFileType] = useState([]);
    const [iterDates, setIterDates] = useState([]);
    const [iterationName, setIterationName] = useState('new Iteration');
    const [listOfDeletedIterIds,setListOfDeletedIterIds] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const defaultFileWeight = 1;
    const defaultCommitMRWeight = 1;
    const defaultLineOfCodeWeight = 1.2; 
    const defaultMinorCodeChangeWeight = 0.2;
    let configData = {
        "MergeRequest": defaultCommitMRWeight,
        "Commit": defaultCommitMRWeight,
        "Line": defaultLineOfCodeWeight,
        "Deleted": defaultMinorCodeChangeWeight,
        "Syntax": defaultMinorCodeChangeWeight,
    }

    const saveDeleteToBackend = async () => {
      if(listOfDeletedIterIds !== undefined && listOfDeletedIterIds.length !== 0){
        await axios.delete(process.env.NODE_ENV === 'development' ?
          `${process.env.REACT_APP_DEVHOST}/configuration/delete/iterations` :
          `configuration/delete/iterations`,
          {
            data: {ids: `${listOfDeletedIterIds}`}
          }
        ).catch((error) => {
          console.log(error.response.status);
        });
        setListOfDeletedIterIds([]);
      }
    }

    const defaultButtonHandler = () => {
      setRefreshFlag(!refreshFlag);
      setListOfDeletedIterIds([]);
      handleIterationName("Not Selected");
      handleIterationStartDate(new Date('January 1, 2021 00:00:00'));
      handleIterationEndDate(new Date('Dec 31, 2021 00:00:00'));
    }

    const refreshHandler = () => {
      setRefreshFlag(!refreshFlag);
      setListOfDeletedIterIds([]);
    }

    useEffect(() => {
      const fetchIterationsDates  = async () => {
        const tmpIterDate = await axios.get(process.env.NODE_ENV === 'development' ?
        `${process.env.REACT_APP_DEVHOST}/configuration/iterations/all` :
        `configuration/iterations/all`);
        setIterDates(tmpIterDate.data);
      }
      fetchIterationsDates();
    // eslint-disable-next-line
    }, [refreshFlag]);

    const saveIterationConfiguration  = async () => {
      await axios.post(process.env.NODE_ENV === 'development' ?

            `${process.env.REACT_APP_DEVHOST}/configuration/newIterationConfig` :
            `/configuration/newIterationConfig`,
          {
            token: `${token}`,
            iterationName: `${iterationName}`,
            startDate:`${moment(startDate).toISOString()}`,
            endDate:`${moment(endDate).toISOString()}`
          }
      ).catch((error) => {
          console.log(error.response.status);
      });
      setRefreshFlag(!refreshFlag);
      setListOfDeletedIterIds([]);
    }

    useEffect(() => {
        const fetchData = async () => {
          const languageResult = await axios.get(
            process.env.NODE_ENV === "development"
              ? `${process.env.REACT_APP_DEVHOST}/project/${project_id}/languages`
              : `/project/${project_id}/languages`
          );
          setFileType(languageResult.data);
          languageResult.data.forEach(lang => configData[lang] = defaultFileWeight);
        };

        fetchData()
          .then(() => {
            console.log("Successfully obtained languages");
          } )
          .catch((e) => {
            console.log("Failed to obtain languages");
            console.log(e);
        });
    // eslint-disable-next-line
    }, [project_id, setFileType]);

    const getIterationNameFromTextField = (e) => {
      setIterationName(e.target.value);
    }

    const getValueFromTextField = (e) => {
        const textFieldId = e.target.id;
        configData[textFieldId] = e.target.value;
    }

    const createTableHeader = () => {
        return(
            <TableRow>
                <TableCell className={classes.headCell} align="center">
                    Iteration Name
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                    Start Date
                </TableCell>
                <TableCell className={classes.headCell} align="center">
                    End Date
                </TableCell>
                <TableCell className={classes.headCell} align="center"/>
            </TableRow>
        );
    }

    const DeleteRow = (rowID) => {
        let filteredIterations = iterDates.filter(iterDate => iterDate.id !== rowID);
        setIterDates(filteredIterations);
        setListOfDeletedIterIds(listOfDeletedIterIds => [...listOfDeletedIterIds,rowID]);
    }

    const createTextFieldsForProjectWeights = () => {
        return(
            <form className={classes.textField} noValidate autoComplete="off">
                <TextField id="MergeRequest" label="Merge Request Weight" variant="outlined" type="number" defaultValue={defaultCommitMRWeight} onChange={getValueFromTextField}/>
                <TextField id="Commit" label="Commit Weight" variant="outlined" type="number" defaultValue={defaultCommitMRWeight} onChange={getValueFromTextField}/>
                <TextField id="Line" label="Line of Code" variant="outlined" type="number" defaultValue={defaultLineOfCodeWeight} onChange={getValueFromTextField}/>
                <TextField id="Deleted" label="Deleted Line" variant="outlined" type="number" defaultValue={defaultMinorCodeChangeWeight} onChange={getValueFromTextField}/>
                <TextField id="Syntax" label="Syntax Change" variant="outlined" type="number" defaultValue={defaultMinorCodeChangeWeight} onChange={getValueFromTextField}/>
            </form>  
        );
    } 

    return (
        <Grid container spacing={5} justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={10}>
                <Typography className={classes.pageTitle}> </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.pageTitle}>Configurations</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader}>Configure Dates</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
            </Grid>
            <Grid item xs={10}>
            <p>Please enter the iteration dates and name and click on "+Add Iteration" to add and save the iteration. </p>
            <p>To apply another iteration, please click "SELECT" next to the desired iteration. </p>
            <p>To deselct the iteration to look at contributions for the whole project duration, click "Deselect"</p>
            <p>To undo any deletion, click "Undo DEL"</p>
            <p>To delete an iteration, please click "Delete" next to the desired iteration, and click "SAVE DEL" to save the deletions.</p>
            </Grid>
            <Grid item xs={3}>
                <form className={classes.textField} noValidate autoComplete="off">
                    <TextField id="IterationName" label="Iteration Name" variant="outlined" onChange={getIterationNameFromTextField}/>
                </form>
                <Calendar startDate={startDate} endDate={endDate} handleStartDate={handleStartDate} handleEndDate={handleEndDate}/>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={10}>
                        <Button variant="contained" component="span" className={classes.addIterationButton} size="large" onClick={saveIterationConfiguration}>+ Add Iteration</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={7} >
                <Typography className={classes.subHeader}>Saved Iterations</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {createTableHeader()}
                        </TableHead>
                        <TableBody>
                            {iterDates.map((row) => (
                                <Row 
                                  key={row.iterationName} 
                                  handleIterationName={handleIterationName} 
                                  deleteRow={DeleteRow} 
                                  row={row}
                                  handleIterationStartDate={handleIterationStartDate}
                                  handleIterationEndDate={handleIterationEndDate}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={10} spacing={5}>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={2}>
                      <Button variant="contained" component="span" className={classes.saveButton} size="large" onClick={defaultButtonHandler}>Deselect</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" component="span" className={classes.saveButton} size="large" onClick={refreshHandler}>Undo DEL</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" component="span" className={classes.saveButton} size="large" onClick={saveDeleteToBackend}>Save DEL</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader}>Configure Score Weights</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <Grid item xs={10}>
                    <form className={classes.textField} noValidate autoComplete="off">
                        <TextField id="ConfigName" label="Configuration Name" variant="outlined" onChange={getValueFromTextField}/>
                    </form>
                </Grid>
                {createTextFieldsForProjectWeights()}
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader1}>Configure Weights by File Type</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <Grid item xs={5}>
                    <form className={classes.textField} noValidate autoComplete="off">
                        {fileType.map((fileType) => (
                            <CreateFileTypeWeightInput key={fileType} fileType={fileType} defaultFileWeight={defaultFileWeight} configData={configData}/>
                        ))}
                    </form>  
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={10}>
                        <Button variant="contained" component="span" className={classes.saveButton} size="large">Save</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WeightConfigurationPage; 