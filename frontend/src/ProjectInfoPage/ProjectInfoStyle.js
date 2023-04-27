import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign:"center"
  },

  memberList: {
    position: "absolute",
    width: "60%",
    height: "50%",
    top: "40%", 
    left: "50%", 
    transform: "translate(-50%, 0)"
  },

  barChartContainer: { 
    position:"absolute",
    width:"100%",
    height:"50%", 
    top:"10%",
    left: "50%",
    transform: "translate(-50%, 0)"

  },
  barChart:{ 
    display:"inline-block", 
    width:"30%",
  }
}));
export { useStyles };
