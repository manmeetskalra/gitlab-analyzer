import TableCell from "@material-ui/core/TableCell";
import React, {useState, Fragment} from "react";
import Button from "@material-ui/core/Button";
import LinkIcon from '@material-ui/icons/Link';
import TableRow from "@material-ui/core/TableRow";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import {useDropdownStyles} from "../../style/CodeContributionPageStyles";
import IconButton from "@material-ui/core/IconButton";
import CodeDiff from "./CodeDiff";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

const CodeContributionsDropdown = (props) => {
  const { row, expandAll } = props;
  const [open, setOpen] = useState(false);
  const classes = useDropdownStyles();

  const isOpen = () => {
    return open || expandAll;
  }
  const rowDiffs = row.diff;
  

    return (
        <Fragment>
          <TableRow className={classes.root} hover role ="checkbox" tabIndex={-1}>
            <TableCell style={{width: 150}} align="left">
              <Button variant="outlined" color="primary" href={row.url} target="_blank" rel="noreferrer noopener">
                Link &nbsp;
                <LinkIcon />
              </Button>
            </TableCell>
            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.score}</TableCell>
            <TableCell>
              <IconButton size='small' onClick={() => setOpen(!open)}>
                {isOpen() ? <ExpandLess className={classes.dropDownIcon} />
                  : <ExpandMore className={classes.dropDownIcon} />}
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#ffffff'}} colSpan={7}>
              <Collapse in={isOpen()} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.banner}> Code Diff </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {rowDiffs.map(diff =>{
                      return <CodeDiff codeDiff={diff}/>;
                    })}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
        </TableRow>
        </Fragment>
    )
}

export default CodeContributionsDropdown;