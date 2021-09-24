import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import api from "../api";
import { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { useParams } from "react-router-dom";

export default function ReviewHustlerPage() {

    const [serviceRequest, setServiceRequest] = useState();
    const [isRated, setIsRated] = useState(false);

    const [rating, setRating] = useState();

    let { id } = useParams();

    function changeRating(newRating, name) {
        setRating(newRating);
    }

    async function submitRating() {
        try {
            await api.review.rateService(serviceRequest._id, rating * 2);
            setIsRated(true);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        let mounted = true;
        api.serviceRequest.getServiceRequestById(id)
            .then(response => {
                const _serviceRequest = response.data.serviceRequest;
                if (mounted) {
                    setServiceRequest(_serviceRequest)
                }
                if (_serviceRequest.reviewId) {
                    setIsRated(true);
                }
            })
            .catch(error => {
                console.error(error);
            })

        return () => mounted = false;


    }, [id])



    return [
        <Box>

            <Box className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>
                <Box height="25vh" />

                {isRated ?
                    <Box>
                        <Typography variant="h5" align="center" style={{ color: "black", backgroundColor: colors.black, fontSize: 21 }}>
                            Thanks for rating!</Typography>
                        <Box height="60vh"></Box>
                    </Box> : <Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="1vh">

                            <Box align="center" width="100vh">
                                <Typography variant="h5" align="center" style={{ color: "black", backgroundColor: colors.black, fontSize: 21 }}>
                                    What did you think of {serviceRequest ? serviceRequest.hustlerId.userId.firstName : ""}?</Typography>
                                <Box height="5vh" />
                                <Typography variant="h5" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 17 }}>
                                    Submitting a review helps others get the best service in the future!
    </Typography>
                            </Box>

                        </Box>
                        <Box height="10vh" />

                        <StarRatings
                            rating={rating}
                            d
                            starDimension="40px"
                            starSpacing="5px"
                            starHoverColor="#ebda8e"
                            starRatedColor="#ebda8e"
                            changeRating={changeRating}
                        />

                        <Box height="10vh" />
                        <Button variant="outlined" color="primary" onClick={submitRating}>Submit</Button>

                        <Box height="80vh" /></Box>}

            </Box>



        </Box>
    ];
}