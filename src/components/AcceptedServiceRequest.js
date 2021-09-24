import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import api from "../api";
import PhoneIcon from '@material-ui/icons/Phone';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function AcceptedServiceRequest(props) {
    const serviceRequest = props.serviceRequest;
    let [markedCompleted, setMarkedCompleted] = useState(false);

    const onMarkCompleted = async () => {
        try {
            await api.booking.markComplete(serviceRequest._id);
            setMarkedCompleted(true);
        }
        catch (e) {
            console.error(e);
        }
    }

    return <Box>

        <Paper>

            <Box padding="20px" style={{ backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                {/* <img src={props.item.url} width="200" height="250" style={{objectFit: "cover"}}></img> */}


                <p style={{ color: "#707070" }}><b>{serviceRequest.hustleId.serviceId.name + " for"}</b></p>
                <p style={{ color: "#707070" }}><b>{serviceRequest.userId?.firstName + " " + serviceRequest.userId?.lastName}</b></p>
                <Box height="20px"></Box>
                <Box><p style={{ color: "#707070" }}>{serviceRequest.userMessage}<br></br></p></Box>
                <Box height="2vh"></Box>
                <Box style={{ display: "flex", margin: "auto", alignItems: "center", justifyContent: "center" }} >
                    <PhoneIcon />
                    <Box width="5px"></Box>
                    <Typography >{serviceRequest.userId?.phone}</Typography>
                </Box>

                <Box height="5vh"></Box>
                {markedCompleted ? <Button disabled={true}>Completed</Button> : <Button color="primary" variant="outlined" onClick={onMarkCompleted}>Mark Completed</Button>}
                <Box height="3vh"></Box>
            </Box>

        </Paper>
    </Box>;

}