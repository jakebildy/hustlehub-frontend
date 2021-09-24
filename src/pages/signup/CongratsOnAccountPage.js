import React from 'react'

import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import { useUser } from "../../state/UserContext";
import congrats from "../../assets/CongratsOnAccount.png";

export default function CongratsOnAccountPage() {

    const [user] = useUser();
    const [hustlerId, setHustlerId] = useState("");
  
  
    useEffect(() => {
      if (user) {
        setHustlerId(user?.hustlerId?._id);
      }
        
    }, [user])

    return (
        <Box align="center">
        
            <Typography style={{ marginTop: "50px" , color: "gray", fontSize: "20px"}}>Congratulations on creating an account!</Typography>
            <img alt="Congrats" src={congrats} height="300px"></img><br></br>
            <Link to={"/profile/" + hustlerId} style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="outlined" style={{ background: "#E1F9FF", margin: "10px" }}>Go to Profile</Button>
            </Link>
            
        </Box>
    )
}

