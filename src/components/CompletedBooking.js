import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import api from "../api";
import PhoneIcon from '@material-ui/icons/Phone';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';
import formatPhoneNumber from '../util/FormatPhone';

export default function CompletedBooking(props) {

    const serviceRequest = props.serviceRequest;
    const hustler = serviceRequest.hustlerId;
    const user = hustler?.userId;
    const HUSTLER_NAME = hustler && user ? `${user.firstName} ${user.lastName}` : "Deleted User";
    const HUSTLER_NUMBER = hustler && user?.phone ? `${formatPhoneNumber(user.phone)}` : "";
    const SERVICE_NAME = serviceRequest?.hustleId?.serviceId?.name ? serviceRequest?.hustleId?.serviceId?.name : "Unnamed Job";

    let [rated, setRated] = useState(serviceRequest.reviewId ? true : false);
    let [buttonClicked, setButtonClicked] = useState(false);
    let [newRating, setNewRating] = useState();

    const onRateButtonClicked = async () => {
        setButtonClicked(true);
    }

    const changeRating = async (rating) => {
        try {
            setNewRating(rating * 2);
            await api.review.rateService(serviceRequest._id, rating * 2, " ")
            setRated(true);

        }
        catch (e) {
            console.error(e);
        }
    }

    return <Box>

        <Paper>

            <Box paddingTop="20px" style={{ backgroundColor: "white" }} padding="20px">
                {/* <img src={props.item.url} width="200" height="250" style={{objectFit: "cover"}}></img> */}


                <p style={{ color: "#707070" }}><b>{SERVICE_NAME + " from"}</b></p>
                <p style={{ color: "#707070" }}><b>{HUSTLER_NAME}</b></p>
                <Box height="20px"></Box>
                <Box><p style={{ color: "#707070" }}>{serviceRequest.userMessage}<br></br></p></Box>
                <Box height="2vh"></Box>
                <Box style={{ display: "flex", margin: "auto", alignItems: "center", justifyContent: "center" }} >
                    <PhoneIcon />
                    <Box width="5px"></Box>
                    <Typography >{HUSTLER_NUMBER}</Typography>
                </Box>

                <Box height="5vh"></Box>
                {rated ?
                    <StarRatings
                        rating={newRating ? newRating : serviceRequest.reviewId.rating / 2}
                        d
                        starDimension="20px"
                        starSpacing="5px"
                        starHoverColor="#ebda8e"
                        starRatedColor="#ebda8e"
                    //changeRating={changeRating}
                    /> : buttonClicked ? <StarRatings

                        d
                        starDimension="20px"
                        starSpacing="5px"
                        starHoverColor="#ebda8e"
                        starRatedColor="#ebda8e"
                        changeRating={changeRating}
                    /> : <Button color="primary" variant="outlined" onClick={onRateButtonClicked}>Rate</Button>}
                <Box height="3vh"></Box>
            </Box>

        </Paper>
    </Box>;

}