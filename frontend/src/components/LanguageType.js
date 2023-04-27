import React from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const LanguageType = (props) => {
  const options = ["JS", "C++", "Java", "Python"];

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    props.onChange(options[index]);
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <div>
      <SettingsIcon style={{ background: "none" }} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select File Type</DialogTitle>
        <List>
          {options.map((option, index) => (
            <ListItem
              button
              onClick={(event) => handleListItemClick(event, index)}
              key={option}
              selected={index === selectedIndex}
            >
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LanguageType;
