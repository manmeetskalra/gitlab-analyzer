import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
        position: "absolute",
        left: "0", 
        top:"2vh",
        width:"100%", 
    },

    contents:{ 
        width:"100%",  
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
    head: {
        backgroundColor: "#d1d0ff",
        color: theme.palette.common.white,
    },
    headCell: {
        fontWeight: "bold",
        fontSize: "1.2rem"
    },
    rowBodyHeader: {
        fontWeight: "bold"
    },
    table: {
        margin: "0 auto 0 auto",
        width: "90%"
    },
    wordCount: {
        paddingLeft: "5em"
    },
    rowBody: {
        fontSize: "1.1rem",
        width: "80%",
    },
    expandBtn: {
        position: "fixed",
        bottom: "1vh",
        right: "1vw",
        backgroundColor: "#7553ff",
        width: "8%",
        color: theme.palette.common.white
    },
    expandBody: {
        backgroundColor: "rgb(142,154,175, 0.15)",
    },
    icon: {
        background: "none",
        hover: "none"
    },
    mrIcon: {
        color: "white",
        backgroundColor: "#0096c7",
        marginLeft: "2vw"
    },
    issueIcon: {
        color: "white",
        backgroundColor: "#f4a261",
        marginLeft: "2vw"
    },
    graph: {
        width: "60vw",
        height: '30vh',
        margin: "20px 0 20px 0"
    }, 
    graphTitle: {
        textAlign: 'center', 
        fontWeight: 'bold',
    }
}));

export default useStyles;