import { makeStyles } from "@material-ui/core"; 

const useStyles = makeStyles((theme) => ({
    body:{
        position: "fixed", 
        background: "white",    
        top:"0",
        left:"0",
        width:"100%",
        height:"100%", 
        zIndex:"1000", 
    },

    errorMsg:{
        position: "absolute",
        top:"70%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },

    icon: {
        position:"absolute",
        width:"15%",
        height: "auto",
        left: "50%",
        top:"30%",
        transform: "translate(-50%,0)",
        
    }
  }));

  export default useStyles;
  