import React from 'react'; 
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@material-ui/core/Grid';


const Calendar = ({startDate,endDate,handleStartDate,handleEndDate}) => {

  const startDateChange = (event)=>{
    handleStartDate(event);
  };
  const endDateChange = (event)=>{
    handleEndDate(event);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
              <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                label="Start Date"
                value={startDate}
                onChange={startDateChange}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
              />
          </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
              <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                label="End Date"
                value={endDate}
                onChange={endDateChange}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
              />
          </Grid>
      </MuiPickersUtilsProvider>
  ​  </div>
  );
}



export default Calendar;