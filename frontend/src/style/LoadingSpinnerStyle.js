import {makeStyles} from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({
    root: {
     position:'fixed',
     height: '100%',
     width: '100%',
     top:'0',
     left:'0',
     background:'#f8f8f8ad',
     zIndex:"1000"
    },
    spinner:{
      top: '50%',
      left: '50%', 
      position: 'absolute', 
    }
  }));
  export default useStyles