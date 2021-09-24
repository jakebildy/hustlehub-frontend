import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NavBar from '../../components/NavBar.js';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Footer from '../../components/Footer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import { useState, useEffect} from 'react';
import api from "../../api";
import SetRateBox from '../../components/SetRateBox';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export default function SetRatePage() {
    let history = useHistory();

    // let hustleMap = {};
    let hustleMap = new Map();


    const onHustleChanged = (hustleId, price, useRequestQuote) => {
        // hustleMap[hustleId] = {hourlyPrice: price, getQuote: useRequestQuote};
        hustleMap.set(hustleId, {hourlyPrice: price, getQuote: useRequestQuote});
    }
    
    const onSubmit = async () => {
        try {
            let hustleUpdates = Array.from(hustleMap, ([name, value]) => ({ name, value }));
            for (let update of hustleUpdates) {
                await api.hustler.setGetQuote(update.name, update.value.getQuote);
                await api.hustler.setHourlyRate(update.name, update.value.hourlyPrice);
            }
            
            history.push("/add-photo/");
        }
        catch (error) {
            console.error(error);
        }
    };


    let [myServices, setServices] = useState([]);

    useEffect(() => {
        let mounted = true;


        api.auth.me()
            .then(response => {               
                api.hustler.getHustlersHustles(response.data.hustler._id)
                .then(response => {
                    setServices(response.data.hustles);
    
                })
                .catch(error => {
                    if (error.response) {
                        console.error(error.response);
                        if (error.response.data) {
                            console.error(error.response.data.message);
    
                        }
                    }
                })
    
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);

                    }
                }
            })

       


        return () => mounted = false;
    }, [])



    return [
        <div>

            <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>

                <Box height="10vh" />



                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 30 }}>
                    Set an hourly rate, or have your customers get a quote: </Typography>

            

                <Grid container  alignItems="center" justify="center" style={{padding: "20px", marginTop: "30px"}}>
                    {
                        myServices.map((hustle)=> {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{padding: "20px"}}>
                                    <Card>                                    
                                        <SetRateBox onHustleChanged={onHustleChanged} hustle={hustle} serviceName={hustle.serviceId.name}></SetRateBox>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>

                {/* <a href="/set-availability/"  style={{ textDecoration: 'none' }} > */}
                <Button variant="outlined" style={{background: "#E1F9FF",}} color="primary" onClick={onSubmit} style={{margin: "30px", marginBottom: "100px"}}>
                    Next
                </Button>
                {/* </a> */}


            </div>


            <Footer></Footer>

        </div>
    ];
}