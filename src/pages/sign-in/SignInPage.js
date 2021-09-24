import React from "react";
import logo from '../../assets/hustlehub.svg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useHistory } from "react-router-dom";
import api from "../../api";
import LoadingButton from "../../components/LoadingButton";
import { useUser } from "../../state/UserContext";
import Grid from '@material-ui/core/Grid';

export default function SignInPage() {
    let history = useHistory();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState(false);

    // const [user, setUser] = useUserState();
    // const [user, updateUser, setUser] = useGlobalState("user");
    const [, setUser] = useUser();

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    };

    const onSignIn = () => {
        setLoading(true);
        let body = { email, password}
        api.auth.login(body)
            .then(response => {
                const user =  response.data.user;
                setUser(user);
                setErrorMessage(false);
                history.push("/home/");
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
            .finally(() => {
                setLoading(false);
            });
    };


    return [
        <div>
  

            <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>

                <Box height="10vh" />

                <img src={logo} alt="HustleHub" style={{ maxHeight: "70px", maxWidth: "80%"}} />

                <Box height="5vh" />



                <Grid container alignItems="center" justify="center">
                    <Grid item xs={8} sm={6} md={4} lg={3}  >

                        <Box height="3vh" />

                        <ValidatorForm
                            // ref="form"
                            onSubmit={onSignIn}
                            onError={errors => console.error(errors)}>

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

                            <Button variant="outlined" style={{background: "#E1F9FF",}} onClick={onSignIn} color="primary" >
                                Sign In
                            </Button>
                            

                        </ValidatorForm>

                        <Box height="1vh" />





                    </Grid></Grid>

                <Box height="3vh" />


                {/* <a href="/verify-phone/" style={{ textDecoration: 'none' }} > */}
                {/* <Button variant="outlined" style={{background: "#E1F9FF",}} color="primary" onClick={onSignup}>
                    Continue
                </Button>  */}
                {/* </a> */}


                <Box height="20vh" />


            </div>

            {
                loading ?
                   <LoadingButton></LoadingButton>
                    :
                    <Box />
            }
            <Footer></Footer>

        </div>
    ];
}