import {
    TextField,
    IconButton,
  } from "@material-ui/core";
import React, {useState, Fragment} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';

const CreateFileTypeWeightInput = (props) => {
    const {fileType, defaultFileWeight, configData} = props
    const [selected, setSelected] = useState(true);
    const [textFieldValue, setTextFieldValue] = useState(defaultFileWeight);
    const classes = useStyles();

    const onSelectionClick = () => {
        setSelected(!selected);
    }

    const displayIcon = () => {
        if(selected) {
            configData[fileType] = textFieldValue;
            return (<IndeterminateCheckBoxIcon className={classes.minusButton}/>);
        }
        else {
            configData[fileType] = -1;
            return(<AddBoxIcon className={classes.plusButton}/>);
        }
    }

    const getTextFieldValue = (e) => {
        const textFieldId = e.target.id;
        const value = e.target.value;
        configData[textFieldId] = value;
        setTextFieldValue(value);
    }

    return (
        <Fragment>
            <IconButton className={classes.button} onClick={onSelectionClick}>{displayIcon()}</IconButton>
            <TextField id={fileType} defaultValue={defaultFileWeight} label={fileType} disabled={!selected} variant="outlined" type="number" onChange={getTextFieldValue}/>
        </Fragment>
    );
}

export default CreateFileTypeWeightInput