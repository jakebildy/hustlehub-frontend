import React from 'react';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'reactjs-popup/dist/index.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {useState} from 'react'
import { useHistory } from "react-router-dom";
import api from "../api";
import { useUser } from "../state/UserContext";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function SignUpPopup() {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

    let history = useHistory();

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [phone, setPhone] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState(false);

    // const [user, setUser] = useUserState();
    // const [user, updateUser, setUser] = useGlobalState("user");
    const [, setUser] = useUser();

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

    const onSignup = () => {
        setLoading(true);
        let body = { email, phone, password, firstName, lastName }
        api.auth.signup(body)
            .then(response => {
                const user =  response.data.user;
                setUser(user);

                setErrorMessage(false);
                history.push("/verify-phone/");
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
            .finally(() => {
                setLoading(false);
            });
    };




    return [
        <Popup
        trigger={<Button variant="outlined" style={{background: "#E1F9FF",}} color="primary">Book</Button>}
        modal


      >
        {close => (
          <Box className="modal" padding="20px" >

            <Typography align="left" style={{ color: "gray",  fontSize: 18 }}>Create an account</Typography>
            <Box  height="1vh"></Box>
            
            
     
            <ValidatorForm
                            // ref="form"
                            onSubmit={onSignup}
                            onError={errors => console.error(errors)}
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
                                label="Mobile Phone Number"
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
         
          </Box>
        )}
      </Popup>
    ];
}