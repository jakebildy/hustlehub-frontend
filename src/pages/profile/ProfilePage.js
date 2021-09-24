import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import star from "../../assets/icons/star.png";
import hustlehub from "../../assets/icons/hustlehub.png";
import pin from "../../assets/icons/pin.png";
import vehicle from "../../assets/icons/vehicle.png";
import Grid from "@material-ui/core/Grid";
import 'react-calendar/dist/Calendar.css';
import Avatar from '@material-ui/core/Avatar';
import api from "../../api";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AvailabilityDisplay from "../../components/AvailabilityDisplay.js";
import skyline from '../../assets/skyline_thin.png';
import HustleCard from './components/HustleCard';
import Modal from '@material-ui/core/Modal';
import BookingPopup from '../../components/BookingPopup';
import ViewPhotosPopup from "../../components/ViewPhotosPopup";

export default function ProfilePage(props) {


    //  const [user, _] = useUser();
    // const [hustler, setHustler] = useState("")
    const hustler = props.hustler;
    console.log(hustler);
    const [hustles, setHustles] = useState([])

    const [loading, setLoading] = useState(true);

    const [isMe, setIsMe] = useState(false);

    const [bookingOpen, setBookingOpen] = React.useState(false);

    const [bookingHustle, setBookingHustle] = React.useState(null);

    const [imagePopupOpen, setImagePopupOpen] = React.useState(false);

    const [selectedPhotos, setSelectedPhotos] = React.useState([]);

    const [photoIndex, setPhotoIndex] = React.useState(0);

    const handleBookingOpen = (hustle) => {
        setBookingHustle(hustle);
        setBookingOpen(true);
    };


    const openImagePopup = (_images, _index) => {
        setSelectedPhotos(_images);
        setPhotoIndex(_index);
        setImagePopupOpen(true);
    };

    const handleImagePopupClose = () => {
        setImagePopupOpen(false);
    }

    const handleBookingClose = () => {
        setBookingOpen(false);
    };

    useEffect(() => {

        (async () => {
            try {
                let _response = await api.auth.me();
                if (hustler.userId._id === _response.data.user._id);
                    setIsMe(true);
            }
            catch (e) {
                console.error(e);
            }
        })();

        api.hustler.getHustlersHustles(hustler._id)
            .then(response => {
                let _hustles = response.data.hustles;
                _hustles = _hustles.filter((hustle) => {
                    return hustle.serviceId;
                });

                setHustles(_hustles);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);

                    }
                }
            })
    }, [hustler]);


    return <Box>
        {!loading
            ? <Box>

                <Box className="category" style={{ backgroundColor: "#0384C6", height: "200px", backgroundImage: `url(${skyline})` }}>
                    {/* <img src={skyline} style={{ maxHeight: "60vh", width: '100%', position: "absolute", left: 0, right: 0, top: -40, zIndex: 0 }}></img> */}
                    <img src={skyline} alt="Skyline" style={{ height: "100%", width: '100%' }}></img>
                    <Avatar src={hustler.profilePic} style={{ height: "180px", width: "180px", position: "absolute", border: '6px solid white', left: "calc(50% - 90px)", top: 145 }} />
                </Box>

                {/* { isMe ? <Box display={{ xs: 'none', sm: 'block'}}>
                    <Link to="/edit-profile/">
                        <Button variant="outlined" color="secondary" style={{ position: "absolute", right: 20, top: 200 }}>
                            Edit Profile
                        </Button>
                    </Link>
                </Box> : <Box></Box>
                } */}



                <Modal open={bookingOpen} onClose={handleBookingClose} aria-labelledby="booking-popup" aria-describedby="booking-popup">
                    <Box className="no-outline" style={{ marginTop: "10vh" }}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid xs={12} md={5}>
                                {/* <Box margin="20px" style={{marginTop:"10vh",}}> */}
                                <BookingPopup closeBooking={handleBookingClose} hustle={bookingHustle} bookOpen={handleBookingOpen} />
                                {/* </Box> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>

                <Modal open={imagePopupOpen} onClose={handleImagePopupClose} aria-labelledby="booking-popup" aria-describedby="booking-popup">
                    <Box className="no-outline" style={{ marginTop: "10vh" }}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid xs={12} md={5}>
                                {/* <Box margin="20px" style={{marginTop:"10vh",}}> */}
                                <ViewPhotosPopup images={selectedPhotos} index={photoIndex} close={handleImagePopupClose} />
                                {/* </Box> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>


                <div style={{ backgroundColor: "#F7F7F7", paddingTop: "100px", paddingBottom: "0px" }}>

                    <Grid style={{ marginBottom: "30px" }}>
                        <Typography style={{ color: "#707070", fontWeight: 'bold', fontSize: 30 }}>
                            {hustler.userId.firstName + " " + hustler.userId.lastName}
                        </Typography>

                        {isMe ?
                            <Box display={{ xs: 'block', sm: 'none' }} style={{ marginBottom: "20px" }}>
                                <a href="/edit-profile/" style={{ textDecoration: "none" }}>
                                    <Button variant="contained" color="secondary" >
                                        Edit Profile
                                </Button>
                                </a>
                            </Box> :
                            <Box></Box>
                        }

                        <Typography> <img alt="Pin" src={pin} style={{ maxHeight: "15px" }} /> London, ON </Typography>
                        {hustler.rating ?
                            <Typography> <img alt="Star" src={star} style={{ maxHeight: "15px" }} />   <b>{hustler.rating * 10}%</b> rating</Typography>
                            : <Box></Box>}

                        {hustler.numJobsDone ?
                            <Typography> <img alt="Jobs done" src={hustlehub} style={{ maxHeight: "15px" }} /> <b>{hustler.numJobsDone}</b> jobs done </Typography>
                            : <Box></Box>}

                        {/* {
                            hustler ?
                                hustler.hasTransportation ?
                                    <Typography> <img alt="Vehicle" src={vehicle} style={{ maxHeight: "15px" }} /> Has a vehicle </Typography>
                                    : <Box /> : <Box />
                        } */}
                    </Grid>



                    <div style={{ backgroundColor: "white", paddingBottom: "50px" }}>
                        <Box height="2vh" />

                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                <Typography align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20, margin: "20px" }}>About</Typography>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Box align="center" paddingLeft="15%" paddingRight="15%">
                                        <Typography variant="h5" align="left" style={{ color: "#383838", backgroundColor: colors.black, fontSize: 20 }}>
                                            {hustler.about}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Box height="200px" display={{ xs: 'block', md: 'none' }} />
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                <Typography align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20, margin: "20px" }}>Availability</Typography>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    align="center"
                                >
                                    <AvailabilityDisplay hustler={hustler} />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* <Button variant="outlined" style={{background: "#E1F9FF",}} color="primary"> Book {hustler.userId.firstName} </Button> */}
                    </div>


                    <Box padding="30px">
                        <Typography align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20, margin: '20px' }}>Services</Typography>
                        <Grid container
                            spacing={1}
                            alignItems="stretch"
                            justify="center">
                            {
                                hustles.map((hustle) => {
                                    return <Grid xs={12} md={5} direction="row" style={{ margin: "10px" }}>

                                        <HustleCard hustle={hustle} bookOpen={handleBookingOpen} openImagePopup={openImagePopup} style={{ height: "100%" }}></HustleCard>


                                    </Grid>
                                })
                            }
                        </Grid>
                    </Box>

                </div>
                <Footer />

            </Box>
            : <Box />
        }
    </Box>;
}
