import {makeStyles} from "@material-ui/core/styles";

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

    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    text: {
        textAlign: 'center'
    },

    graph: {
        width: "60vw",
        height: '30vh',
        margin: "20px 0 20px 0"
    }, 
 
    table: {
        margin: "0 auto 0 auto",
        width: "90%"
    },
    header: {
        backgroundColor: "#d1d0ff",
        color: theme.palette.common.white,
    },
    headCell: {
        fontWeight: "bold",
        fontSize: "1.2rem"
    },  
    dropDownColumn: {
        minWidth: 50
    },
    icon: {
        background: 'none'
    },
    noteText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 400
    },
    charts: {
        paddingTop: '100px',
    }, 
    dropDownRow: {
        backgroundColor: 'rgb(142,154,175, 0.15)',
        borderBottom: "medium solid #7553ff",
    },
    expandBtn: {
        position: "fixed",
        bottom: "1vh",
        right: "1vw",
        backgroundColor: "#7553ff",
        width: "8%",
        color: theme.palette.common.white
    },
  }));

  export default useStyles;