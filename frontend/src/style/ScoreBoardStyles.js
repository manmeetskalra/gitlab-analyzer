import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "4vh",
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "12vh",
    },
    marginTop: "15vh",
    flexDirection: "column",
    marginLeft: "-80px",
    display: "flex",
    justify: "space-between",
  },
  button: {   
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.up("lg")]: {
      margin: "5px",
      fontSize: "13px",
      height: "5vh",
      width: "23vh",
    },
    [theme.breakpoints.down("md")]: {
      margin:'2px',
      fontSize: "10px",
      height: "3vh",
      width: "23vh",
      
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "7px",
      margin:'1px',
    },
  },
  buttonContainer: {
    marginLeft: "5vw",
  },

  scoreboardContainer: {
    width: "100%",
    [theme.breakpoints.up("lg")]: { 
      marginTop: "5vh", 
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "2vh", 
    }, 
    
  },
}));

export default useStyles;
