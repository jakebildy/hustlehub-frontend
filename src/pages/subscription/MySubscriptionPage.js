import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Card, Grid, } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import skyline from '../../assets/skyline.png';
import Typography from '@material-ui/core/Typography';
import Footer from "../../components/Footer.js";

import { loadStripe } from "@stripe/stripe-js";
import api from "../../api/index.js";
import toolbox from "../../assets/AcceptedJobs.png";
import { useUser } from "../../state/UserContext";
import { useHistory } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const STRIPE_TEST_PUBLIC_KEY = "pk_test_51Ii4w6GUr0aglNu27AFhUq9SGKDOCPtjsJ61ghQRsVJqS852IDHWBaebBKzug8ZFRCq2VyuWPCq5yo4qr0cXf2qT00wbNV2CcS";
const STRIPE_LIVE_PUBLIC_KEY = "pk_live_51Ii4w6GUr0aglNu203NiaNoFGB9FWVQq1j5ylUYvWAyaNctAtOJrtcQF3kg5vEDJUkEDrBmgdu6VfEVwfSDdfpkV00BKCbkZ5f";
const STRIPE_PUBLIC_KEY = process.env.NODE_ENV === "production" ? STRIPE_LIVE_PUBLIC_KEY : STRIPE_TEST_PUBLIC_KEY;
// const STRIPE_PUBLIC_KEY = STRIPE_TEST_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function MySubscriptionPage() {

    const [popupOpen, setPopupOpen] = React.useState(false);
    const [subscription, setSubscription] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [endOfBillingCycleDate, setEndOfBillingCycleDate] = React.useState();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [user] = useUser();
    let history = useHistory();

    React.useEffect(async () => {
        if (!user) return;
        if (!loading) return;

        try {
        

            if (!user.hustlerSubscriptionActive) {
                return history.push("/setup-payment/");
            }

            let _response = await api.payment.subscription();
            let _subscription = _response.data.subscription;
            setSubscription(_subscription);
            let _endOfBillingCycle = new Date(_subscription.current_period_end * 1000);
            setEndOfBillingCycleDate(_endOfBillingCycle);
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, [user])

    const openPopup = () => {
        setPopupOpen(true);
    };


    const handlePopupClose = () => {
        setPopupOpen(false);
    };


    const PopupCard = () => {

        const cancelSubscription = async () => {
            try {
                let _response = await api.payment.cancel();
                handlePopupClose();
                setSubscription(_response.data.subscription);
             
            }
            catch (error) {
                console.error(error);
            }

        }

        return <Card align="center" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, position: "sticky", top: 100, }}>
            <Typography>Are you sure you want to cancel your subscription?</Typography>

            <Button variant="outlined" color="primary" style={{ background: "#E1F9FF", marginTop: "20px", marginBottom: "10px" }} >Go back</Button>
            <br></br>
            <Button style={{ marginTop: "1px", marginBottom: "10px", color: "#CC0000" }} onClick={cancelSubscription}>Cancel Subscription</Button>
        </Card>
    }


    const uncancelSubscription = async () => {
        try {
            let _response = await api.payment.uncancel();
            setSubscription(_response.data.subscription);
        }
        catch (error) {
            console.error(error);
        }

    }

    
    return <Box>

        <Modal open={popupOpen} onClose={handlePopupClose} aria-labelledby="popup-cancel" aria-describedby="popup-cancel"  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Box className="no-outline" margin="30px" style={{ marginTop: "10px", width: "300px" }}>
                <PopupCard />
            </Box>
        </Modal>

        <Grid container alignItems="center" justify="center" style={{ position: "absolute", top: "240px", }}>

            {
                !loading ?
                    <Grid item xs={12} sm={12} md={7} lg={6} xl={6} >
                        <Card style={{ margin: "30px", position: "relative", padding: "20px" }}>
                            {/* <Typography align="left" style={{ fontSize: "25px", color: "#6F7070", paddingTop: "20px" }}>$4/month</Typography> */}
                            {!subscription?.cancel_at_period_end ?
                            <Typography align="left" style={{ fontSize: "25px", color: "#6F7070",  }}>${subscription?.plan?.amount/100}/{subscription?.plan?.interval} </Typography> : <Box></Box>}
                            <Typography align="left" style={{ fontSize: "20px", fontWeight: "bold", }}>{subscription?.cancel_at_period_end ? "Subscription ends at" : "Next billing date"}:  {endOfBillingCycleDate?.toLocaleDateString(undefined, dateOptions)} </Typography>
                            <img src={toolbox} height="200px"></img>
                        </Card>
                    </Grid>
                    :
                    <Grid item xs={12} sm={12} md={7} lg={6} xl={6} >
                        <Card style={{ margin: "30px", position: "relative", paddingLeft: "20px" }}>
                            <Typography align="left" style={{ fontSize: "25px", color: "#6F7070", paddingTop: "20px" }}>Loading...</Typography>
                            <Typography align="left" style={{ fontSize: "20px", fontWeight: "bold", }}>Loading...</Typography>
                            <img src={toolbox} height="200px"></img>
                        </Card>
                    </Grid>
            }



        </Grid>

        <Box
            minHeight="300px"
            padding="42.0px"
            align="center"
            style={{
                backgroundColor: "#0f567a",
                backgroundImage: "url(" + skyline + ")",
                backgroundSize: "cover"
            }}>
            <Typography style={{ color: "white", fontSize: "40px", fontWeight: "bold", }}>My Subscription</Typography>

            {/* <Box width="500px">
                <StripeWidget></StripeWidget>
            </Box> */}

        </Box>

        <Box color="#F7F7F7">


            <Grid container alignItems="center" justify="center" >
                <Grid item xs={12} sm={8} md={5} lg={4} xl={4} >
                    <Box height="200px"></Box>
                </Grid>

            </Grid>
            {subscription?.cancel_at_period_end ? <Button color="primary" variant="outlined"  style={{ background: "#E1F9FF" }} onClick={uncancelSubscription}>Restore Subscription</Button> : <Button onClick={openPopup}>Cancel Subscription</Button>}
            

            <Grid container alignItems="center" justify="center" >
                <Grid item xs={12} sm={8} md={5} lg={4} xl={4} >
                    <Box height="100px"></Box>
                </Grid>


            </Grid>


        </Box>
        <Footer></Footer>
    </Box>



}
