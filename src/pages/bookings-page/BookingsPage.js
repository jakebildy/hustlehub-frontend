import React from "react";
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer'
import api from "../../api";
import { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import InProgressBooking from '../../components/InProgressBooking';
import CompletedBooking from '../../components/CompletedBooking';
import pending from '../../assets/BookingsInProgress.png';
import completed from "../../assets/BookingsCompleted.png";
import Button from '@material-ui/core/Button';
import becomehustler from '../../assets/UserBecomeHustler.png';
import { useUser } from "../../state/UserContext";
import { useHistory } from "react-router-dom";


export default function BookingsPage() { 

    const [inProgressRequests, setInProgressRequests] = useState([]);

    const [completedRequests, setCompletedRequests] = useState([]);

    const [user] = useUser();

    let history = useHistory();

    function onBecomeAHustler(){
        let userId = user._id;
        api.hustler.createHustler({})
            .then(response => {
                history.push("/add-services/");
            })
            .catch(error => {
                console.error(error);
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                //        setErrorMessage(error.response.data.message);
                    }
                }
            })
            .finally(() => {});
        
    }

    useEffect(() => {
       // let mounted = true;
        api.serviceRequest.getUserAcceptedServiceRequests()
            .then(response => {
                setInProgressRequests(response.data.serviceRequests);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                    }
                }
            })


        api.serviceRequest.getUserCompletedServiceRequests()
            .then(response => {
                setCompletedRequests(response.data.serviceRequests);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                    }
                }
            })
        

    }, [])



    return [
        <Box>
            <Box padding="30px"  style={{ backgroundColor: "#F7F7F7" }}>
            <Typography style={{color:"#586164", fontWeight: "bold", fontSize: "30px", paddingBottom: "30px "}}>Welcome back, {user.firstName}</Typography>
                    {user.hustlerSubscriptionActive ? <Box></Box> :
                        <Grid container alignItems="center" justify="center">
                            <Grid sm={12} lg={8}>
                            <Card style={{padding:"30px"}}>
                                <Typography style={{color:"#586164", fontSize: "20px"}}>Want to sell your services? <br></br> We’ll connect you with customers online so you can be your own boss.</Typography>
                                <img src={becomehustler} alt="Become Hustler" style={{maxHeight: "230px"}}></img>
                                <br></br>
                                <Button color="primary" variant="outlined" style={{background: "#E1F9FF",}} onClick={onBecomeAHustler}>Become a Hustler</Button>
                            </Card>
                            </Grid>
                        </Grid>
                        
                 }

            </Box>


            <Box style={{ backgroundColor: "white" }}>
                <Box height="5vh" />

    
                <Box paddingLeft="50px">
                    <Typography variant="h5" align="left" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold' }}>
                        In Progress Bookings
                </Typography>
                </Box>




                <Grid container alignItems="center" justify="center" style={{ padding: "20px", marginTop: "10px" }}>
                    { inProgressRequests.length >= 1 ?
                        inProgressRequests.map((serviceRequest) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ padding: "20px" }}>
                                    <Card>
                                        <InProgressBooking serviceRequest={serviceRequest}></InProgressBooking>
                                    </Card>
                                </Grid>
                            )
                        }) :                         
                        <Box>
                        <img src={pending} alt="Pending" style={{maxHeight: "230px"}}></img>
                        <Typography style={{fontWeight: "bold", color: "#05A4D0", fontSize: "20px"}}>No In Progress Bookings</Typography>
                    </Box>
                    }
                </Grid>



                <Box  style={{ backgroundColor: "#F7F7F7" }}>
                    <Box paddingLeft="50px" paddingTop="20px">
                        <Typography variant="h5" align="left" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold' }}>
                            Completed Bookings
                </Typography>
                    </Box>

                    <Grid container alignItems="center" justify="center" style={{ padding: "20px", marginTop: "10px" }}>
                        { completedRequests.length >= 1 ?
                            completedRequests.map((serviceRequest) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ padding: "20px" }}>
                                        <Card>
                                            <CompletedBooking serviceRequest={serviceRequest}></CompletedBooking>
                                        </Card>
                                    </Grid>
                                )
                            }) : <Box>
                            <img src={completed} alt="Completed" style={{maxHeight: "230px"}}></img>
                            <Typography style={{fontWeight: "bold", color: "#05A4D0", fontSize: "20px"}}>No Completed Bookings</Typography>
                        </Box>
                        }
                    </Grid>


                    <Box height="20vh"></Box>
                </Box></Box>


            <Footer></Footer>


        </Box>
    ];
}