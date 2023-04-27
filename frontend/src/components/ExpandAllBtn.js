import React from 'react';
import { Button } from '@material-ui/core';
import useStyles from '../style/ExpandAllBtnStyles';

const IssueContributionPage = (props) => {
    const classes = useStyles();
    const { expandAll, setExpandAll } = props

    const handleExpand = () => {
        setExpandAll(!expandAll)
    }

    return (
        <Button variant="contained" onClick={handleExpand} className={classes.expandBtn}>
            {expandAll ? "Collapse All" : "Expand All"}
        </Button>
    )
}


export default IssueContributionPage;