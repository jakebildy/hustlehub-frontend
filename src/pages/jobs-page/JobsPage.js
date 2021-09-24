import React from "react";
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer'
import api from "../../api";
import { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import PendingServiceRequest from '../../components/PendingServiceRequest';
import AcceptedServiceRequest from '../../components/AcceptedServiceRequest';
import pending from '../../assets/PendingJobs.png';
import accepted from '../../assets/AcceptedJobs.png';
import { useUser } from "../../state/UserContext";
import { useHistory } from "react-router-dom";

export default function JobsPage() {

    const [acceptedRequests, setAcceptedRequests]  =  useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [user] = useUser();
    let history = useHistory();
    
    useEffect(() => {

        if (!user) return;
        console.log("freeTrial", user.freeTrial);
        if (!user.freeTrial && !user.hustlerSubscriptionActive) {
           return history.push("/activate-hustlehub/");
        }

        
        api.serviceRequest.getHustlerAcceptedServiceRequests()
        .then(response => {
            setAcceptedRequests(response.data.serviceRequests);
        })
        .catch(error => {
            if (error.response) {
                console.error(error.response);
                if (error.response.data) {
                    console.error(error.response.data.message);
                }
            }
        })


        api.serviceRequest.getHustlerPendingServiceRequests()
            .then(response => {
                setPendingRequests(response.data.serviceRequests);
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
            <Box className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>
                <Box height="5vh" />


                <Box paddingLeft="50px">
                <Typography variant="h5" align="left" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold' }}>
                   Pending Jobs
                </Typography>
                </Box>
                

             
                
                <Grid container  alignItems="center" justify="center" style={{padding: "20px", marginTop: "10px"}}>
                    {
                        pendingRequests.length >= 1 ?
                        pendingRequests.map((serviceRequest)=> {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{padding: "20px"}}>
                                    <Card>                                    
                                        <PendingServiceRequest serviceRequest={serviceRequest}></PendingServiceRequest>
                                    </Card>
                                </Grid>
                            )
                        }) : 
                        <Box>
                            <img src={pending} alt="Pending" style={{maxHeight: "150px"}}></img>
                            <Typography style={{fontWeight: "bold", color: "#05A4D0", fontSize: "20px"}}>No Pending Job Requests</Typography>
                        </Box>
                    }
                </Grid>


                <Box style={{backgroundColor: "white"}}>
                <Box paddingLeft="50px" paddingTop="20px">
                <Typography variant="h5" align="left" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold' }}>
                   Accepted Jobs
                </Typography>
                </Box>
                

             
                
                <Grid container  alignItems="center" justify="center" style={{padding: "20px", marginTop: "10px"}}>
                    {
                        acceptedRequests.length >= 1 ?
                        acceptedRequests.map((serviceRequest)=> {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{padding: "20px"}}>
                                    <Card>                                    
                                        <AcceptedServiceRequest serviceRequest={serviceRequest}></AcceptedServiceRequest>
                                    </Card>
                                </Grid>
                            )
                        }) :
                        <Box>
                        <img src={accepted} alt="Accepted" style={{maxHeight: "150px"}}></img>
                        <Typography style={{fontWeight: "bold", color: "#05A4D0", fontSize: "20px"}}>No Accepted Job Requests</Typography>
                        </Box>
                    }
                </Grid>


                <Box height="20vh"></Box>
            </Box>
            </Box>
            <Footer></Footer>


        </Box>
    ];
}