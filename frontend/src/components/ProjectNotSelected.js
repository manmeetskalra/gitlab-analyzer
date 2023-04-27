import React from "react";
import useStyles from "../style/NoProjectSelectedStyle";
import icon from "../logo/embarrassed.png";

const ProjectNotSelected = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <img src={icon} alt="oops" className={classes.icon} />
      <div className={classes.errorMsg}>
      <h1>
        Oops! It looks like you have not selected any project or member yet!
        <br></br> 
      </h1>
      <h3>
        Please navigate to 'Projects' to select a project or click on the member
        list in 'Project Overview" to select a student.
      </h3>
      </div>
     
    </div>
  );
};

export default ProjectNotSelected;
