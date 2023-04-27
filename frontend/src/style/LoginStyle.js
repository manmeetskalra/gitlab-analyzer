import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({        
    h2:{ 
        marginTop: '30%',
        marginBottom: '15%', 
    },

    formBox:{ 
        width:'25%',
        height:'60%',
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderColor: 'rgb(195,195,195)',
        m: 1,
        border: 1,         
    },
    
    customButton:{
        marginTop:'10%',
        width:'60%',
        backgroundImage: 'linear-gradient(to bottom right,rgb(100,7,254), rgb(214,35,113))',
        backgroundColor: 'rgb(92,58,171)',     
    },

    customTextField: {
        width: '70%'
    },         
    
    logo: {
        width:"50%",
        position: 'absolute',
        left: '50%', 
        top: '15%',
        transform: 'translate(-50%, -50%)', 

    }
  })); 
  export {useStyles}

