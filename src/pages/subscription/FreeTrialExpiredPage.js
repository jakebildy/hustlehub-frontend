import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Card, Grid, } from '@material-ui/core';

import skyline from '../../assets/skyline.png';
import Typography from '@material-ui/core/Typography';
import Footer from "../../components/Footer.js";

import { loadStripe } from "@stripe/stripe-js";
import api from "../../api/index.js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const STRIPE_TEST_PUBLIC_KEY = "pk_test_51Ii4w6GUr0aglNu27AFhUq9SGKDOCPtjsJ61ghQRsVJqS852IDHWBaebBKzug8ZFRCq2VyuWPCq5yo4qr0cXf2qT00wbNV2CcS";
const STRIPE_LIVE_PUBLIC_KEY = "pk_live_51Ii4w6GUr0aglNu203NiaNoFGB9FWVQq1j5ylUYvWAyaNctAtOJrtcQF3kg5vEDJUkEDrBmgdu6VfEVwfSDdfpkV00BKCbkZ5f";
const STRIPE_PUBLIC_KEY = process.env.NODE_ENV === "production" ? STRIPE_LIVE_PUBLIC_KEY : STRIPE_TEST_PUBLIC_KEY;
// const STRIPE_PUBLIC_KEY = STRIPE_TEST_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function FreeTrialExpiredPage() {

    const handleClick = async (subscriptionType) => {

        try {
            // Get Stripe.js instance
            const stripe = await stripePromise;
        
            // Call your backend to create the Checkout Session
            let response;
            if (subscriptionType === "monthly") {
                response = await api.payment.monthly()
            }
            else {
                response = await api.payment.yearly()
            }
            const session = await response.data;
        
            // When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe.redirectToCheckout({
            sessionId: session.id,
            });
        
            if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            }
        }
        catch(error) {
            console.error(error);
        }
      };

    return <Box>

        <Grid container alignItems="center" justify="center" style={{position: "absolute", top: "240px",}}>


        <Grid item xs={12} sm={8} md={5} lg={4} xl={4} >
            <Card style={{margin: "30px", position: "relative"}}>
                    
                    <Typography style={{fontSize: "70px", paddingTop: "20px"}}>5</Typography>
                    <Typography style={{fontSize: "20px", position: "absolute", top: "80px", left: "55%"}}>/mo</Typography>
                    <Typography style={{fontSize: "20px", position: "absolute", top: "40px", left: "40%"}}>$</Typography>

                    <Typography style={{fontSize: "20px", fontWeight: "bold", paddingTop: "20px"}}>Monthly</Typography>
                    <Typography style={{fontSize: "20px" }}><i>Continue getting jobs</i></Typography>

                    <Button variant="outlined" style={{background: "#E1F9FF", marginTop: "40px", marginBottom: "40px"}} color="primary" onClick={()=>handleClick("monthly")}>
                        Activate
                    </Button>
           
                </Card>
            </Grid>

           


        </Grid>

        <Box
            minHeight="300px"
            padding="42.0px"
            align="center"
            style={{
                backgroundColor: "#0384C6",
                backgroundImage: "url(" + skyline + ")",
                backgroundSize: "cover"
            }}>
            <Typography style={{ color: "white", fontSize: "40px", fontWeight: "bold", }}>Your free trial has expired</Typography>
            {/* <Box width="500px">
                <StripeWidget></StripeWidget>
            </Box> */}

        </Box>

        <Box color="#F7F7F7">

           
        <Grid container alignItems="center" justify="center" >
                <Grid item xs={12} sm={8} md={5} lg={4} xl={4} >
                    <Box height="280px"></Box>
                </Grid>
                
                <Grid item xs={12} sm={8} md={5} lg={4} xl={4} >
                <Box height="280px"></Box>
                </Grid>
            </Grid>

          
        </Box>
        <Footer></Footer>
    </Box>



}