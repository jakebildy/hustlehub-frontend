import React from 'react'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import noresultsduck from "../../assets/NoResults.png";

export default function PaymentFailedPage() {

    
    return (
        <Box align="center">
        
            <Typography style={{ marginTop: "50px" , color: "gray", fontSize: "20px"}}>Oh no! Your payment failed or you cancelled the transaction.</Typography>
            <img alt="Oh no Duck" src={noresultsduck} height="300px"></img><br></br>
            <Link to={"/setup-payment/"} style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="outlined" style={{ background: "#E1F9FF", margin: "10px" }}>Try again</Button>
            </Link>
            
        </Box>
    )
}

