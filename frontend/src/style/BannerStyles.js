import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor:"rgb(208,209,253,0.7)",
    boxShadow: "2px 2px 5px rgb(208,209,253) ", 
    position: "absolute",
    width:"100%",  
    [theme.breakpoints.up("lg")]: {
      height: "30vh", 
    },
    [theme.breakpoints.down("md")]: {
      height: "25vh", 
    },
    [theme.breakpoints.down("sm")]: {
      height: "20vh", 
    }, 
  },

  large: {
    width:"20%",
    height:"auto"
  },

  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    marginTop:"3em",
  },

  details: {
    fontSize: "30px",
    position: "relative", 
    marginBottom:"3vh",
    fontWeight:"bold"
  },
}));

export default useStyles;
