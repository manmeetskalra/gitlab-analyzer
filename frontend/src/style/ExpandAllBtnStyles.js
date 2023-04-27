import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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