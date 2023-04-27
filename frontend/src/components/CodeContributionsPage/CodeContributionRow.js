import React, {useState, Fragment} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import * as PropTypes from "prop-types";
import {useRowStyles} from "../../style/CodeContributionPageStyles";
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import CodeContributionsDropdown from "./CodeContributionsDropdown";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

const CodeContributionRow = (props) => {
  const { row, expandAll } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const commitContributionRows = row.relatedCommits;
  const columns = [
    {id: 'date', label: 'Commit Date'},
    {id: 'name', label: 'Commit Name'},
    {id: 'score', label: 'Commit Score'},
    {id: 'codeDiff', label: 'Code Diff'},
  ]

  const isOpen = () => {
    return open || expandAll;
  }

  return (
    <Fragment>
      <TableRow className={classes.root} hover role ="checkbox" tabIndex={-1}>
        <TableCell style={{width: 200}} align="left">
          <Button variant="outlined" color="primary" href={row.url} target="_blank" rel="noreferrer noopener">
             Link &nbsp;
            <LinkIcon />
          </Button>
        </TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.mrScore}</TableCell>
        <TableCell align="left">{row.totalCommitScore}</TableCell>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {isOpen() ? <ExpandLess className={classes.dropDownIcon} />
              : <ExpandMore className={classes.dropDownIcon} />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#f1f0fc' }} colSpan={7}>
          <Collapse in={isOpen()} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.banner}> Commits </TableCell>
                    {columns.map((column) => (
                      <TableCell className={classes.banner} key={column.id}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commitContributionRows.map((commitRow) => (
                    <CodeContributionsDropdown key={commitRow.id} row={commitRow}/>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}



CodeContributionRow.propTypes = {
  expandAll: PropTypes.bool.isRequired,
};

export default CodeContributionRow;