import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "2vh",
    left: "0",
    width: "100%",
  },
  table: {
    margin: "0 auto 0 auto",
    width: "90%",
    [theme.breakpoints.up("lg")]: {
      marginTop: "30vh",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "25vh",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20vh",
    },
  },
  banner: {
    background: "#d1d0ff",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cell: {
    width: 300,
  },
}));