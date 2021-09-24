import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {useState} from 'react'
import api from "../api";
import { useUser } from "../state/UserContext";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { colors, } from '@material-ui/core';
import BookingRequestSent from '../assets/BookingRequestSent.png';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export default function BookingPopup(props) {
    const [dateRange, setDateRange] = useState(
        {
          startDate: new Date(),
          endDate: (new Date().setDate( (new Date()).getDate() + 7)),
          key: 'selection'
        }
      );


    const handleBookingClose = props.closeBooking;

    const hustle = props.hustle

    //The code for the verification page
    let [code, setCode] = useState("");

    let [bookState, setBookState] = useState(0);

    let [message, setMessage] = useState("");

    const [user, setUser] = useUser();

   
    var loggedIn = false;
    if (user) { loggedIn = true;}


    const onBookPressed = () => {
        setBookState(1);

        
        if (loggedIn) {
        setBookState(3);
        sendBookingRequest();
        }
    }


    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [phone, setPhone] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
  //  let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState(false);


    // const [user, setUser] = useUserState();
    // const [user, updateUser, setUser] = useGlobalState("user");


    const onFirstNameChanged = (e) => {
        setFirstName(e.target.value);
    };
    const onLastNameChanged = (e) => {
        setLastName(e.target.value);
    };

    const onPhoneChanged = (e) => {
        setPhone(e.target.value);
    };

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    };


    // For the Verification state
    const onCodeChanged = (e) => {
        setCode(e.target.value);
    };

    const onMessageChanged = (e) => {
        setMessage(e.target.value);
    };

    const onSignup = () => {
        let body = { email, phone, password, firstName, lastName }
        api.auth.signup(body)
            .then(response => {
                const user =  response.data.user;
                setUser(user);

                setErrorMessage(false);
                setBookState(2);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                        setErrorMessage(error.response.data.message);
                    }
                } else {
                    setErrorMessage("Network Error");
                }
            })
            .finally(() => {});
    };


    const onVerify = () => {
        let userId = user._id;
        api.verify.verifyPhone(userId, code)
            .then(response => {
                setErrorMessage(false);
                setBookState(3);
                sendBookingRequest();
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                        setErrorMessage(error.response.data.message);
                    }
                }
            })
            .finally(() => {});
    };

    const sendBookingRequest  = async () => {
        try {
            api.booking.createServiceRequest(hustle._id, message, [dateRange.startDate, dateRange.endDate]);
        }
        catch (error) {
            console.error(error);
        }
    }



    const VerifyButton = () => (
        <Button color="primary" onClick={onVerify}>
            VERIFY
        </Button>
    )

    return bookState === 0 ? (
    
            <Card style={{backgroundColor: "white", width: "100%", paddingTop:"20px", paddingBottom: "20px"}}>

            <Typography align="center" style={{ color: "gray",  fontSize: 18 }}>Select your potential availability</Typography>
            <Box  height="1vh"></Box>
            


                    <Grid container alignItems="center" justify="center" >

                    
                    <DateRange
                        editableDateInputs={true}
                        color="#05C9FF"
                        rangeColors={["#05C9FF"]}
                        onChange={
                            (item) => {
                                if (!item.selection) return;
                                setDateRange(item.selection);
                            }
                        }
                        moveRangeOnFirstSelection={false}
                        ranges={[ dateRange]}
                        // ranges={[dateRange]}
                        style={{width: "100%"}}
                        />
            

                    
                    <TextField
                        placeholder="Explain what you'd like them to do"
                        multiline
                        fullWidth
                        onChange={onMessageChanged}
                        value={message}
                        variant="outlined"
                        rows={3}
                        inputProps={{
                            maxlength: 500
                        }}
                        helperText={`${message.length}/${500}`}
                        rowsMax={4}
                        style={{marginLeft: "20px", marginRight: "20px"}}
                        //onChange={onAboutChanged}
                    />
                    
                        
          
                        
                    </Grid>
            
                <Box  height="2vh"></Box>
            
            <Box align="center">
              <Button variant="outlined" style={{background: "#E1F9FF", marginRight: "20px"}} color="primary" onClick={onBookPressed} >Contact</Button>

              <Button onClick={handleBookingClose}>Cancel</Button>
              </Box>
         
          </Card>
        ) : bookState === 1 ? <Card className="modal"  style={{backgroundColor: "white", padding:"20px"}}>

        <Typography align="left" style={{ color: "gray", backgroundColor: "white", fontSize: 18 }}>Create an account so we can confirm your booking</Typography>
        <Box  height="4vh"></Box>
        
        
 
        <ValidatorForm
                        // ref="form"
                        onSubmit={onSignup}
                        onError={errors => console.log(errors)}
                    >

                        <TextValidator
                            label="First Name"
                            onChange={onFirstNameChanged}
                            name="firstName"
                            value={firstName}
                            fullWidth
                            validators={['required', 'isName']}
                            errorMessages={['This field is required', 'First name is not valid']}
                        />

                        <Box height="3vh" />

                        <TextValidator
                            label="Last Name"
                            onChange={onLastNameChanged}
                            name="lastName"
                            value={lastName}
                            fullWidth
                            validators={['required', 'isName']}
                            errorMessages={['This field is required', 'Last name is not valid']}
                        />

                        <Box height="3vh" />

                        <TextValidator
                            label="Email"
                            onChange={onEmailChanged}
                            name="email"
                            value={email}
                            fullWidth
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                        />

                        <Box height="3vh" />

                        <TextValidator
                            label="Phone Number"
                            onChange={onPhoneChanged}
                            name="phone"
                            value={phone}
                            fullWidth
                            validators={['required', 'isPhone']}
                            errorMessages={['This field is required', 'Phone is not valid']}
                        />

                        <Box height="3vh" />


                        <TextValidator
                            label="Password"
                            onChange={onPasswordChanged}
                            name="password"
                            value={password}
                            fullWidth
                            type="password"
                            validators={['required', 'isPassword']}
                            errorMessages={['This field is required', 'Password is not valid']}
                        />

                        <Box height="5vh" />


                        {
                            errorMessage ?
                                <Box>
                                    <Typography>*{errorMessage}</Typography>
                                    <Box height="3vh" />
                                </Box>
                                :
                                <Box />
                        }

            

                    </ValidatorForm>
       
        
            <Box  height="2vh"></Box>
        
        <Box align="center">
          <Button variant="outlined" style={{background: "#E1F9FF",}} color="primary" onClick={onSignup}>Sign Up</Button>
          </Box>
     
      </Card> : bookState === 2 ? <Card>
          
                    <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>

                <Box height="5vh" />

                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 30 }}>
                    Verify account
                </Typography>
                <Box height="5vh" />

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="1vh">

                    <Box align="center" width="50vh">

                        <Typography
                            variant="h1"
                            align="center"
                            style={{
                                color: "#707070",
                                backgroundColor: colors.black,
                                fontWeight: "bold",
                                fontSize: 20
                            }}>
                            Enter the verification code sent to {user.phone}:
                        </Typography>
                        <Box height="5vh" />

                        <TextField
                            label="Verification Code"
                            margin="normal"
                            fullWidth
                            placeholder="Code"
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                            type="name"
                            name="name"
                            required={true}
                            onChange={onCodeChanged}
                            InputProps={{ endAdornment: <VerifyButton /> }}
                        />
                        <Box height="1vh" />


                        <Button variant="outlined" color="primary" >
                            I didn't get a code
                         </Button>

                    </Box></Box>

                <Box height="2vh" />

                {
                    errorMessage ?
                        <Box>
                            <Typography>*{errorMessage}</Typography>
                            <Box height="3vh" />
                        </Box>
                        :
                        <Box />
                }

      
                <Box height="20vh" />


                </div>
          
          </Card> : <Card align="center" style={{backgroundColor: "white",}}>
              <Box>
                  <img src={BookingRequestSent} alt="booking request sent" height='300px'></img>
              </Box>
              <Box>
              <Typography variant="h5" align="center" style={{ color: "#707070", fontSize: "20px" }}>We have sent your request to {hustle.hustlerId.userId.firstName}, and they'll be in touch shortly. 
               <br></br>
               Thanks for using HustleHub to support local business.</Typography>
               <br></br>
               </Box>

               <Button variant="outlined" color="primary" onClick={handleBookingClose}>Close</Button>
               <Box height="20px"></Box>
          </Card>
        }