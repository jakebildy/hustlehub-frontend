import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { colors } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState } from 'react';
import api from "../api";

export default function SetRateBox(props) {
    const onHustleChanged = props.onHustleChanged;
    const hustle = props.hustle;
    const serviceName = props.serviceName;

    let [rate, setRate] = useState(hustle.hourlyRate);
    let [getQuote, setGetQuote] = useState(false);
    onHustleChanged(hustle._id, rate, getQuote);


    const onRateChanged = (e) => {
        setRate(e.target.value);
        onHustleChanged(hustle._id, e.target.value, getQuote);
    };


    const handleChange = (event) => {
        setGetQuote(event.target.checked);
        onHustleChanged(hustle._id, rate, event.target.checked);
    };



    return <Box padding="20px">
        <Typography variant="h1" align="center" style={{ color: "#07070", backgroundColor: colors.black, fontSize: 20 }}>
            <b>{serviceName}</b> </Typography>

        <Box height="4vh" />

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="1vh">

            {!getQuote ? <Box align="center" width="100px" style={{ display: "flex", flexDirection: "row", }}>

                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20 }}>
                    $ </Typography>
                <Box width="10px"></Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    rows={1}
                    rowsMax={1}
                    onChange={onRateChanged}
                    defaultValue={rate ? rate : 20}
                />
                <Box width="10px"></Box>
                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20 }}>
                    /hr</Typography>
            </Box>
                : <Box></Box>}
        </Box>

        <Box height="5vh" />

        <FormControlLabel
            control={
                <Checkbox
                    checked={getQuote}
                    onChange={handleChange}
                    name="checkedGetQuote"
                    color="primary"
                />
            }
            label="I prefer my customers request a quote (i.e. don’t display an hourly rate)"
        />
    </Box>;

}