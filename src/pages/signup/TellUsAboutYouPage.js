import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Footer from '../../components/Footer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import api from "../../api";

export default function AboutPage() {
    let history = useHistory();

    let [about, setAbout] = useState("");
    const [state, setState] = React.useState({
        checkedToolbox: true,
        checkedCar: false,
    });

    const onSubmit = async () => {
        try {
            await api.hustler.setAbout(about);
            //await api.hustler.setHasOwnTools(state.checkedToolbox);
            console.log("CHECKED CAR", state.checkedCar);
            // await api.hustler.setHasTransportation(state.checkedCar);
            history.push("/set-availability/");
        }
        catch (error) {
            console.error(error);
        }
    };

    const onAboutChanged = (e) => {
        setAbout(e.target.value);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    return [
        <div>


            <div style={{ backgroundColor: "#F7F7F7", padding: "20px" }}>

                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 30 }}>
                    Tell us about your business </Typography>

                <Box height="30px" />


                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="1vh">

                    <Box align="center" width="100vh">

                        <TextField
                            placeholder="Talk about what you do"
                            multiline
                            fullWidth
                            variant="outlined"
                            rows={4}
                            rowsMax={10}
                            inputProps={{
                                maxlength: 750
                              }}
                            helperText={`${about.length}/${750}`}
                            onChange={onAboutChanged}
                        />
                    </Box></Box>


                <Box height="5vh" />

{/* 
                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20 }}>
                    I have a </Typography>

                <Box height="1vh" />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedCar}
                            onChange={handleChange}
                            name="checkedCar"
                            color="primary"
                        />
                    }
                    label="Car"
                /> */}

            
                <Box height="5vh" />


                {/* <a href="/set-availability/"  style={{ textDecoration: 'none' }} > */}
                <Button variant="outlined" style={{background: "#E1F9FF",}} color="primary" onClick={onSubmit}>
                    Next
                </Button>
                {/* </a> */}


                <Box height="2vh" />

                <a href="/set-availability/" style={{ textDecoration: 'none' }} >
                    <Button variant="outlined" color="primary">
                        Skip
                </Button>
                </a>

                <Box height="20vh" />


            </div>


            <Footer></Footer>

        </div>
    ];
}