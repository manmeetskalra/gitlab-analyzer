import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({        
    h2:{ 
        marginTop: '20%',
        marginBottom: '8%', 
    },

    formBox:{ 
        width:'40%',
        height:'55%', 
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
        width:'50%',
        backgroundImage: 'linear-gradient(to bottom right,rgb(100,7,254), rgb(214,35,113))',
        backgroundColor: 'rgb(92,58,171)',     
    },

    customTextField: {
        width: '80%'
    },  

    logo: {
        width:"31%",
        position: 'absolute',
        left: '50%', 
        top: '15%',
        transform: 'translate(-50%, -50%)', 

    }

  }));

  export {useStyles}