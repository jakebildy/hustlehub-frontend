import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

export default function InProgressBooking(props) {

    const serviceRequest = props.serviceRequest;
    const hustler = serviceRequest.hustlerId;
    const user = hustler?.userId;
    const HUSTLER_NAME = hustler && user ? `${user.firstName} ${user.lastName}` : "Deleted User";
    const HUSTLER_NUMBER = hustler && user ? `${formatPhoneNumber(user.phone)}` : "";
    const SERVICE_NAME = serviceRequest?.hustleId?.serviceId?.name ? serviceRequest?.hustleId?.serviceId?.name : "Unnamed Job";


    return <Box>

        <Paper>

            <Box style={{ backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                {/* <img src={props.item.url} width="200" height="250" style={{objectFit: "cover"}}></img> */}

                <Box style={{ display: "flex", margin: "auto", alignItems: "center", justifyContent: "center" }} >

                    <Avatar src={hustler.profilePic} style={{ height: 90, width: 90, margin: 20 }} />
                    <Box>
                        <Typography style={{ color: "black", fontSize: "20px" }}><b>{HUSTLER_NAME}</b></Typography>
                        <p style={{ color: "#707070" }}><b>{SERVICE_NAME}</b></p>
                    </Box>
                </Box>

                <Box style={{ backgroundColor: "#2B2E2E", width: "100%" }}>
                    <Box paddingTop="10px" paddingLeft="20px">
                        <Box style={{ display: "flex", margin: "auto", alignItems: "left", justifyContent: "left" }} >
                            <PhoneIcon style={{ color: "#EAEAEA" }} />
                            <Box width="5px"></Box>
                            <Typography style={{ color: "#EAEAEA" }} >{HUSTLER_NUMBER}</Typography>
                        </Box>
                    </Box>

                    <Box height="20px"></Box>
                    <Box style={{ paddingLeft: "20px", paddingRight: "20px", }}><p style={{ color: "#EAEAEA" }}><i>{serviceRequest.userMessage}</i><br></br></p></Box>

                    <Box height="5vh"></Box>
                    <Button disabled={true} style={{ color: "#5C5C5C" }}>In Progress</Button>
                    <Box height="3vh"></Box>

                </Box>
            </Box>

        </Paper>
    </Box>;

}