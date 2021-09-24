import React from "react";
import Box from '@material-ui/core/Box';
import { colors, Modal } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import 'react-calendar/dist/Calendar.css';
import api from "../../api";
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Slider from '@material-ui/core/Slider';
import { useParams } from "react-router-dom";
import SearchResult from "../../components/SearchResult.js";
import Pagination from "@material-ui/lab/Pagination"
import LoadingDuck from "../../assets/LoadingDuck.gif";
import NoResultsDuck from '../../components/NoResultsDuck';
import BookingPopup from '../../components/BookingPopup';
import ViewPhotosPopup from "../../components/ViewPhotosPopup";

export default function FindHustlerPage() {


  //  const [displaySearch, setDisplaySearch] = useState(true)

    const [loading, setLoading] = useState(true);

    const showSearch = () => {
     //   setDisplaySearch(true);
    }

    const hideSearch = () => {
     //   setDisplaySearch(false);
    }

    const CITY_ID = "60648f619de9eeaa66aa1b52";
    const HUSTLES_PER_PAGE = 20;

    const [state, setState] = React.useState({
        checkedCar: true,
        checkedMorning: true,
        checkedAfternoon: true,
        checkedEvening: true,
    });

    const [price, setPrice] = React.useState([10, 100]);
    const [searchPrice, setSearchPrice] = React.useState(price);

    const [hustles, setHustles] = React.useState([]);
    const [pendingServiceRequestsMap, setPendingServiceRequestsMap] = React.useState([]);
    const [currentPageHustles, setCurrentPageHustles] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const [filterOpen, setFilterOpen] = React.useState(false);
    const [bookingOpen, setBookingOpen] = React.useState(false);
    
    const [bookingHustle, setBookingHustle] = React.useState(null);

    const [imagePopupOpen, setImagePopupOpen] = React.useState(false);

    const [selectedPhotos, setSelectedPhotos] = React.useState([]);

    const [photoIndex, setPhotoIndex] = React.useState(0);


    const openImagePopup = (_images, _index) => {
        setSelectedPhotos(_images);
        setPhotoIndex(_index);
        setImagePopupOpen(true);
    };

    const handleImagePopupClose = () => {
        setImagePopupOpen(false);
    }


    const handleFilterClose = () => {
        setFilterOpen(false);
    };

        
    const handleBookingOpen = (hustle) => {
        setBookingHustle(hustle);
        setBookingOpen(true);

    };

    const handleBookingClose = () => {
        setBookingOpen(false);
    };

    const isHustleBooked = (hustle) => {
        return pendingServiceRequestsMap[hustle._id] != null;
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handlePriceChange = (event, newValue) => {
        setPrice(newValue);
    };

    const handlePriceCommitted = (event, newValue) => {
        setSearchPrice(newValue);
    };

    const changePage = (event, newPage) => {
        setPage(newPage);
        setCurrentPageHustles(hustles.slice(page * HUSTLES_PER_PAGE, page * HUSTLES_PER_PAGE + HUSTLES_PER_PAGE))
        window.scrollTo(0, 0);
    };


    let { searchParam } = useParams();

    useEffect(() => {
        let mounted = true;

        // api.hustler.search(CITY_ID, searchParam)
        api.hustler.searchWithPriceRange(CITY_ID, searchParam, searchPrice[0], searchPrice[1])
            .then(response => {
                const hustles = response.data.hustles;
                if (mounted) {
                    setHustles(hustles)
                    setCurrentPageHustles(hustles.slice(0, 20))

                    let _pages = Math.floor((hustles.length - 1) / HUSTLES_PER_PAGE) + 1;
                    _pages = _pages > 0 ? _pages : 1;
                    setTotalPages(_pages);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                    }
                }
            })
            .finally(()=>{
                setTimeout(() => { setLoading(false); }, 1000);
            });

        api.serviceRequest.getUserPendingServiceRequests()
            .then(response => {
                const serviceRequests = response.data.serviceRequests;
                const _map = {};
                for (let serviceRequest of serviceRequests) {
                    _map[serviceRequest.hustleId._id] = true;
                }
                setPendingServiceRequestsMap(_map);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                    }
                }
            });

        return () => mounted = false;
    }, [searchParam, searchPrice])

    useEffect(() => {
        let mounted = true;

        //Gets list of services
        api.service.getServices()
            .then(response => {
               // const services = response.data.services;
                if (mounted) {
                 //   setServices(services)

                }
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

    const FilterCard = () => {
        return <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, position: "sticky", top: 100, }}>
            <Typography align="left" style={{ color: "black", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>Time of Day</Typography>
            <FormGroup >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedMorning}
                            onChange={handleChange}
                            name="checkedMorning"
                            color="primary"
                        />
                    }
                    label="Morning (9 AM - 12 PM)"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedAfternoon}
                            onChange={handleChange}
                            name="checkedAfternoon"
                            color="primary"
                        />
                    }
                    label="Afternoon (12 PM - 5 PM)"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedEvening}
                            onChange={handleChange}
                            name="checkedEvening"
                            color="primary"
                        />
                    }
                    label="Evening (5 PM - 9 PM)"
                />
            </FormGroup>

            <Divider variant="fullWidth" />
            <Box height="1vh" />

            <Typography align="left" style={{ color: "black", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>Price</Typography>


            <Slider
                value={price}
                onChange={handlePriceChange}
                onChangeCommitted={handlePriceCommitted}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />

            <Box height="1vh" />

            <Typography align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 15 }}>{"$" + price[0] + "/hr to $" + price[1] + "/hr"}</Typography>

            <Box height="2vh" />

            {/* <Divider variant="fullWidth" />
            <Box height="1vh" /> */}

            {/* <Typography align="left" style={{ color: "black", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>Other</Typography>


            <FormGroup >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedCar}
                            onChange={handleChange}
                            name="checkedCar"
                            color="primary"
                        />
                    }
                    label="Vehicle Required"
                />
            </FormGroup> */}
        </Card>
    }

    return [
        <div>
            <Modal open={filterOpen} onClose={handleFilterClose} aria-labelledby="filter-search" aria-describedby="filter-search">   
                <Box className="no-outline" margin="30px" style={{marginTop:"10vh"}}>
                    <FilterCard/>
                </Box>
            </Modal>

            <Modal open={bookingOpen} onClose={handleBookingClose} aria-labelledby="booking-popup" aria-describedby="booking-popup">  
            <Box className="no-outline" style={{marginTop:"10vh"}}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid xs={12} md={5}>
                        {/* <Box margin="20px" style={{marginTop:"10vh",}}> */}
                            <BookingPopup style={{outline: "none"}}  closeBooking={handleBookingClose} hustle={bookingHustle} />
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

            {!loading ?

                <Box>

                    {/* <AppBar elevation={3} position="sticky">
                        <Box style={{ backgroundColor: "#1e3f58" }} padding="15px">
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid xs={6} direction="row">

                                    <Box display="flex" justifyContent="center" alignItems="center" >
                                        <Box display={{ xs: 'block', md: 'none' }} padding="0">
                                            <Button variant="outlined" style={{background: "#E1F9FF",}} style={{marginRight: "10px"}} onClick={handleFilterOpen}>Filter Search</Button>
                                        </Box>

                                        <Box flexGrow={1}>
                                            
                                        </Box>
                                    </Box>

                                </Grid>
                            </Grid>

                        </Box>
                    </AppBar> */}


                    <Box padding="30px" style={{ backgroundColor: "#F7F7F7" }}>
                        <Grid container spacing={0} >

                            <Grid item xs={12} md={4} lg={3}>
                                <Box display={{ xs: 'none', md: 'block' }} padding="0" marginRight="25px">
                                    <FilterCard></FilterCard>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Box style={{ minHeight: "calc(100vh - 250px)" }}>
                                    {
                                        hustles.length < 1
                                            ? <NoResultsDuck name={searchParam} />
                                            : currentPageHustles.map((hustle) => {
                                                return (
                                                    <Box>
                                                        <SearchResult hustle={hustle} openImagePopup={openImagePopup} booked={isHustleBooked(hustle)} showSearch={showSearch} hideSearch={hideSearch} bookOpen={handleBookingOpen}></SearchResult>
                                                        <Box height="3vh" />
                                                    </Box>

                                                )
                                            })
                                    }
                                </Box>

                            </Grid>
                      
                        </Grid>

                        <Grid container justify = "center">
                        <Pagination count={totalPages} page={page} onChange={changePage} />
                        </Grid>

                    </Box>
                   

                    <Footer />
                </Box>
                : <Box paddingTop="8%">
                    <img src={LoadingDuck} alt="Loading Duck" height="380px"></img>
                    <Typography style={{ color: "#707070", fontSize: 21 }}>Searching...</Typography>
                </Box>}

        </div>
    ];
}