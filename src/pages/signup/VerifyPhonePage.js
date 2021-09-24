import React from "react";
import logo from '../../assets/hustlehub.svg'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Footer from '../../components/Footer';
import { useState } from 'react';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {useHistory } from "react-router-dom";
import api from "../../api";
// import LoadingButton from '../components/LoadingButton';
import { useUser } from "../../state/UserContext";
import LoadingButton from "../../components/LoadingButton";
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import formatPhoneNumber from '../../util/FormatPhone';

//TODO move this to its own component
const ResendCard = (props) => {

    let [phoneNumber, setPhoneNumber] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const onPhoneNumberChanged = (e) => {
        setPhoneNumber(e.target.value);
    };

    //TODO VALIDATE PHONE NUMBER
    async function onRequestPhoneNumberChange() {
        try {
           let response = await api.user.requestPhoneNumberChange(phoneNumber);

            if (props.onCloseResendCard)
                props.onCloseResendCard(phoneNumber);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error(error);
        }
    }

    return <Box align="center">
        <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, position: "sticky", top: 100, width: "400px" }}>
            <Typography align="center" style={{ color: "black", }}>Enter your phone number:</Typography>
            <TextField
                style={{ marginTop: "10px" }}
                value={phoneNumber}
                onChange={onPhoneNumberChanged}
                placeholder="(519) 123 4567">
            </TextField>

            <Typography align="center" style={{ color: "red", }}>{errorMessage ? "*" : ""}{errorMessage}</Typography>
            <br></br>
            <Button color="primary" variant="outlined" onClick={onRequestPhoneNumberChange} style={{ marginTop: "20px", marginBottom: "30px" }}>Resend Code</Button>

        </Card>
    </Box>
}

export default function VerifyPhonePage() {

    let history = useHistory();
    const [user] = useUser();
    // if (!user) { history.push("/signup/"); }

    let [code, setCode] = useState("");
    let [loading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState(false);
    let [phoneNumber, setPhoneNumber] = useState(formatPhoneNumber(user.phone));

    const onCodeChanged = (e) => {
        setCode(e.target.value);
    };

    const onVerify = () => {
        setLoading(true);
        let userId = user._id;
        api.verify.verifyPhone(userId, code)
            .then(response => {
                setErrorMessage(false);
                history.push("/choose-type/");
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


    const [resendOpen, setResendOpen] = React.useState(false);

    const handleResendOpen = () => {
        setResendOpen(true);
    };

    const handleResendClose = (_phoneNumber) => {
        setPhoneNumber(formatPhoneNumber(_phoneNumber));
        setResendOpen(false);

    };


    return [
        <div>

            <Modal open={resendOpen} onClose={handleResendClose} aria-labelledby="filter-search" aria-describedby="filter-search">
                <Box className="no-outline" margin="30px" style={{ marginTop: "10vh" }}>
                    <ResendCard onCloseResendCard={handleResendClose} />
                </Box>
            </Modal>

            <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>

                <Box height="10vh" />

                <img src={logo} alt="HustleHub" style={{ maxHeight: "70px", maxWidth: "80%" }} />
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
                            Enter the verification code sent to <br></br> {phoneNumber || formatPhoneNumber(user.phone)}:
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
                            onSubmit={onVerify}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    // Do code here
                                    onVerify();
                                    ev.preventDefault();
                                }
                            }}
                        />
                        <Box height="1vh" />


                    </Box></Box>

                <Box margin="25px">
                    <Button color="primary" variant="outlined" style={{ background: "#E1F9FF", }} onClick={onVerify}>
                        VERIFY
                    </Button>
                </Box>

                {
                    errorMessage ?
                        <Box margin="15px">
                            <Typography>*{errorMessage}</Typography>
                        </Box>
                        :
                        <Box />
                }

                <Button onClick={handleResendOpen} color="primary" >
                    Didn't get a code?
                </Button>

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