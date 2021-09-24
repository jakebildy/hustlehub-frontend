import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import Avatar from "@material-ui/core/Avatar";
import { useState } from 'react';
import api from '../../api/index';
import { useHistory } from "react-router-dom";
import  Grid from '@material-ui/core/Grid';
import Link from 'react-router-dom/Link';

export default function AddPhotoPage() {
    let history = useHistory();

    let [photo, setPhoto] = useState("");

    let [file, setFile] = useState("");

    const onPhotoChanged = (e) => {
       // setPhotoName(e.target.value);
        setFile(e.target.files[0]);
        setPhoto(URL.createObjectURL(e.target.files[0]));
        submitForm();
    };

    const submitForm = () => {
        const formData = new FormData();
        formData.append("avatar", file);
      
        api.hustler.uploadAvatar(formData)
            .then((response)=>{
                history.push("/tell-us-about/");
            })
            .catch((error)=>{
                console.error(error);
            });
      };

    return <Box>

            <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>

                <Box height="10vh" />



                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 30 }}>
                    Add a profile photo to get recognition
                </Typography>

                <Box height="20px" />


                <Grid container alignItems="center" justify="center" spacing={5}>
                    <Grid item>
                        <Avatar src={photo} style={{ height: "120px" , width: "120px"}} />
                    </Grid>
                </Grid>

                <Box height="5vh" />

                <Button
                variant="outlined" style={{background: "#E1F9FF",}}
                component="label"
                >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange = {(newValue) => onPhotoChanged(newValue)} 
                />
                </Button>
                
                <Box height="20px" />
                You'll get more responses if you have a profile photo.
                <Box height="20px" />

                <Button disabled={file === ""} variant="outlined" style={{background: file !== "" ? "#E1F9FF" : "",}} color="primary" onClick={submitForm}>
                    Next
                </Button>

                <Box height="2vh" />

                <Link to="/tell-us-about/"  style={{ textDecoration: 'none' }} >
                <Button variant="outlined" color="primary">
                    Skip
                </Button>
                </Link>

                <Box height="20vh" />

            </div>
            <Footer></Footer>
        </Box>;
}