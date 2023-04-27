import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3%',
        position: "absolute"
    },
    textField: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '13rem',
        },
      },
    pageTitle: {
        fontWeight: 'bold', 
        fontSize: '1.6rem'
    },
    subHeader: {
        fontWeight: 'bold', 
        fontSize: '1.4rem'
    },
    subHeader1: {
        fontWeight: 'bold', 
        fontSize: '1.2rem'
    },
    divider: {
        height: '0.15rem',
    },
    headCell: {
        fontWeight: "bold",
        fontSize: "1.2rem",
    }, 
    row: {
        hover: {
            color: "#7553ff",
        }
    },
    button: {
        justifyContent: 'center',
        textAlign: 'center',
        justify: 'center'
    },
    minusButton: {
        color: 'rgb(255,0,100)',
    },
    plusButton: {
        color: 'rgb(0,200,255)',
    },
    saveButton: {
        color: 'rgb(255,255,255)',
        backgroundColor: '#7553ff',
    },
    addIterationButton: {
        color: 'rgb(255,255,255)',
        backgroundColor: 'rgb(255,180,0)',
    },
    deleteButton: {
        color: 'rgb(255,255,255)',
        backgroundColor: 'rgb(255,0,100)',
    },
    applyButton: {
      color: 'rgb(255,255,255)',
      backgroundColor: 'rgb(0, 153, 51)',
    }
}));

export default useStyles; 