import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "../style/WeightDialogStyles"

const WeightDialog = (props) => {
  const {weights, setWeights} = props;
  let {commitScore, mrScore, fileScore} = weights;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setCommit = (event) => {
    commitScore = event.target.value;
  }

  const setMR = (event) => {
    mrScore = event.target.value;
  }

  const setFileScore = (event) => {
    fileScore = event.target.value;
  }

  const handleSubmit = () => {
    setWeights({commitScore: commitScore, mrScore: mrScore, fileScore: fileScore});
    handleClose();
  }

  return (
    <div>
      <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          className={classes.button}
      >
        Configure Weights
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configure Weighting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configure Weights to Change Scoring
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="commit"
            label="Commit Weight"
            type="number"
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            onChange={setCommit}
            defaultValue={commitScore}
          />
          <TextField
            margin="dense"
            id="mergeRequest"
            label="Merge Request Weight"
            type="number"
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            onChange={setMR}
            defaultValue={mrScore}
          />
          <TextField
              margin="dense"
              id="mergeRequest"
              label="File Type Weight"
              type="number"
              InputProps={{
                inputProps: {
                  min: 0
                }
              }}
              onChange={setFileScore}
              defaultValue={fileScore}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WeightDialog;
