import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  scoreContainer:{
    backgroundColor: "rgb(236,242,245)",
    width: "110%",
    height:"110%",
    borderRadius:"20px 20px",
  
  }, 
  score:{
    textAlign: "center", 
    fontSize: "1.0rem", 
    fontWeight: "bold",
  },

  titles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
      
    [theme.breakpoints.up("lg")]: { 
      fontSize: "1.0rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.0rem",
    }, 
  },  
}));

export default useStyles;
