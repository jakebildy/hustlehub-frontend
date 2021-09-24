import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

export default function AvailabilityEditableDisplay(props){


    const hustler = props.hustler;
    const onAvailabilityChanged = props.onAvailabilityChanged;

    const useStyles = makeStyles((theme) => ({
        root: {
        display: 'flex',
        },
        formControl: {
        margin: theme.spacing(3),
        },
    }));


    const classes = useStyles();


    function createData(time, monday, tuesday, wedensday, thursday, friday, saturday, sunday, index) {
        return { time, monday, tuesday, wedensday, thursday, friday, saturday, sunday, index };
    }

    const rows = [
        createData('Morning (9:00 AM - 12:00 PM)', false, false, false, false, false, false, false, 0),
        createData('Afternoon (12:00 PM - 5:00 PM)', false, false, false, false, false, false, false, 1),
        createData('Evening (5:00 PM - 9:00 PM)', false, false, false, false, false, false, false, 2),
    ];
  
    const [state, setState] = React.useState({
        monday: Array(3),
        tuesday: Array(3),
        wednesday: Array(3),
        thursday: Array(3),
        friday: Array(3),
        saturday: Array(3),
        sunday: Array(3)
      });

      function getBody(){
        return [
          state.monday,
          state.tuesday,
          state.wednesday,
          state.thursday,
          state.friday,
          state.saturday,
          state.sunday
        ]
      }

      const handleChange = (event, index) => {
        let day = state[event.target.name];
        day[index] = event.target.checked;
    
        setState({ ...state, [event.target.name]: day });
        if (onAvailabilityChanged) {
          onAvailabilityChanged(getBody());
        }
      };

    return [

        <Box style={{ display: "flex", flexDirection: "row", }}>
 <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="1vh">

          <Box align="center" width="120vh">

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="caption table">
                <caption>Choose your general availability for each day. You'll still get to confirm bookings before they're placed.</caption>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">Mon</TableCell>
                    <TableCell align="right">Tue</TableCell>
                    <TableCell align="right">Wed</TableCell>
                    <TableCell align="right">Thu</TableCell>
                    <TableCell align="right">Fri</TableCell>
                    <TableCell align="right">Sat</TableCell>
                    <TableCell align="right">Sun</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.time}>
                      <TableCell component="th" scope="row">
                        {row.time}
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          checked={state.monday[row.monday]}
                          onChange={(event)=>handleChange(event, row.index)}
                          name="monday"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          checked={state.tuesday[row.tuesday]}
                          onChange={(event)=>handleChange(event, row.index)}
                          name="tuesday"
                          color="primary"
                        /></TableCell>
                      <TableCell align="right">              <Checkbox
                        checked={state.wednesday[row.wednesday]}
                        onChange={(event)=>handleChange(event, row.index)}
                        name="wednesday"
                        color="primary"
                      /></TableCell>
                      <TableCell align="right">              <Checkbox
                        checked={state.thursday[row.thursday]}
                        onChange={(event)=>handleChange(event, row.index)}
                        name="thursday"
                        color="primary"
                      /></TableCell>
                      <TableCell align="right">              <Checkbox
                        checked={state.friday[row.friday]}
                        onChange={(event)=>handleChange(event, row.index)}
                        name="friday"
                        color="primary"
                      /></TableCell>
                      <TableCell align="right"><Checkbox
                        checked={state.saturday[row.saturday]}
                        onChange={(event)=>handleChange(event, row.index)}
                        name="saturday"
                        color="primary"
                      />{state.saturday[row.saturday]}</TableCell>
                      <TableCell align="right"><Checkbox
                        checked={state.sunday[row.sunday]}
                        onChange={(event)=>handleChange(event, row.index)}
                        name="sunday"
                        color="primary"
                      /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Box>
        </Box>

           
        </Box>

        
    ];
}