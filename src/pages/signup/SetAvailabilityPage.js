import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import api from "../../api";

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


// Page purposely left nasty for future interns. <3

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function AddPhotoPage() {
  let history = useHistory();

  const classes = useStyles();
  const [state, setState] = React.useState({
    monday: Array(3),
    tuesday: Array(3),
    wednesday: Array(3),
    thursday: Array(3),
    friday: Array(3),
    saturday: Array(3),
    sunday: Array(3)
  });
 

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const handleChange = (event, index) => {
    let day = state[event.target.name];
    day[index] = event.target.checked;

    setState({ ...state, [event.target.name]: day });
  };


  const handleChangeWeekday = (event, index) => {

    //This is an Array(3) of morning, afternoon and evening
    let day = state[event.target.name];
    day[index] = event.target.checked;

    setState({ ...state, "monday": day,"tuesday": day,"wednesday": day,"thursday": day ,"friday": day });

  };



  function createData(time, monday, tuesday, wednesday, thursday, friday, saturday, sunday, index) {
    return { time, monday, tuesday, wednesday, thursday, friday, saturday, sunday, index };
  }

  const rows = [
    createData('Morning (9:00 AM - 12:00 PM)', false, false, false, false, false, false, false, 0),
    createData('Afternoon (12:00 PM - 5:00 PM)', false, false, false, false, false, false, false, 1),
    createData('Evening (5:00 PM - 9:00 PM)', false, false, false, false, false, false, false, 2),
  ];

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

  const onSubmit = () => {
    //setLoading(true);
    api.hustler.setAvailability(getBody())
      .then(response => {
       // setErrorMessage(false);
        // history.push("/setup-payment/");
        history.push("/terms-of-service/");
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response);
          if (error.response.data) {
            console.error(error.response.data.message);
           // setErrorMessage(error.response.data.message);
          }
        } else {
         // setErrorMessage("Network Error");
        }
      })
      .finally(() => {
       // setLoading(false);
      });
  };

  return [
    <div>


      <div style={{ backgroundColor: "#F7F7F7", padding: "15px" }}>



        <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 30 }}>
          Now set your availability </Typography>

        <Box height="30px" />




        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="1vh">

          <Box align="center" width="120vh">
          
            <Box display={{ xs: 'none', sm: 'block', md: 'block' }}>
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

            <Box display={{ xs: 'block', sm: 'none', md: 'none' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                  <caption>Choose your general availability for each day. You'll still get to confirm bookings before they're placed.</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">Weekday</TableCell>
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
                        <TableCell align="right">              <Checkbox
                          checked={state.friday[row.friday]}
                          onChange={(event)=>handleChangeWeekday(event, row.index)}
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

        <Box height="20px" />

          <Button variant="outlined" color="primary" style={{background: "#E1F9FF",}} onClick={onSubmit}>Next</Button>

        <Box height="2vh" />

        <a href="/profile/" style={{ textDecoration: 'none' }} >
        <Button variant="outlined" color="primary">Skip</Button>
        </a>

        <Box height="20vh" />


      </div>


      <Footer></Footer>

    </div>
  ];
}