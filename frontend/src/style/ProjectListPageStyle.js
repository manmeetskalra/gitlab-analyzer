import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    nextButton: {
      position: "absolute",
      bottom: "5%",
      left: "68%",
      width: "5%"
    },
    batchButton: {
      position: "absolute",
      bottom: "5%",
      left: "58%",
      width: "9%"
    },
    syncButton: {
      position: "absolute",
      bottom: "5%",
      left: "48%",
      width: "9%"
    },

    errorMsg:{
      position: "absolute",
      top: "15%",      
      left: "50%",
      transform: "translate(-50%, -50%)"

    }

  });

  export {useStyles}  