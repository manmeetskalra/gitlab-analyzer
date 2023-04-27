import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "fixed",
    width: "14%",
    backgroundColor: "#0E0824",
    boxShadow: "2px 2px 5px ",
  },
  link: {
    textDecoration: "none",
    color: "rgb(225, 225, 225)",
  },
  list: {
    position: "absolute",
    top: "30%",
  },

  icon: {
    color: "rgb(225,225,225)",
    display: "flex",
  },

  header: {
    position: "fixed",
    color: "white",
    backgroundColor: "#0E0824",
    padding: "1vh 0 1vh 0",
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    margin: "0",
    top: "0",
    left: "0",
    zIndex: "10000",
    boxShadow: "2px 2px 5px #0E0824 ",
  },

  menuIcon: {
    position: "fixed",
    zIndex: "20000",
    color: "rgba(236, 236, 236, 0.74)",
    left: "1%",
    width: "2%",
    height: "auto",
    cursor: "pointer",
  },
}));

export default useStyles;
