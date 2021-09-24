import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import api from "../api";
import PhoneIcon from '@material-ui/icons/Phone';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function PendingServiceRequest(props) {

    const serviceRequest = props.serviceRequest;
    const client = serviceRequest.userId;
    const CLIENT_NAME = client ? `${client.firstName} ${client.lastName}` : "Deleted User";

    let [markedAccepted, setMarkedAccepted] = useState(false);
    let [markedDeclined, setMarkedDeclined] = useState(false);

    const onMarkAccepted = async () => {
        try {
            await api.booking.markAccepted(serviceRequest._id);
            setMarkedAccepted(true);
        }
        catch (e) {
            console.error(e);
        }
    }

    const onMarkDeclined = async () => {
        try {
            await api.booking.markDeclined(serviceRequest._id);
            setMarkedDeclined(true);
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
                <p style={{ color: "#707070" }}><b>{CLIENT_NAME}</b></p>
                <Box height="20px"></Box>
                <Box><p style={{ color: "#707070" }}>{serviceRequest.userMessage}<br></br></p></Box>
                <Box height="2vh"></Box>
                <Box style={{ display: "flex", margin: "auto", alignItems: "center", justifyContent: "center" }} >
                    <PhoneIcon />
                    <Box width="5px"></Box>
                    <Typography >{serviceRequest.userId?.phone}</Typography>
                </Box>

                <Box height="5vh"></Box>
                {markedAccepted ? <Button disabled={true}>Accepted</Button> : markedDeclined ? <Box></Box> : <Button color="primary" variant="outlined" onClick={onMarkAccepted}>Accept</Button>}

                {markedDeclined ? <Button disabled={true}>Declined</Button> : markedAccepted ? <Box></Box> : <Button style={{ color: "#FF0000" }} onClick={onMarkDeclined}>Decline</Button>}
                <Box height="3vh"></Box>
            </Box>

        </Paper>
    </Box>;

}