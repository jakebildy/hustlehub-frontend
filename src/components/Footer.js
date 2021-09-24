import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { colors, } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import facebook from '../assets/link-facebook.png';
import ig from '../assets/link-instagram.png';
import linkedin from '../assets/link-linkedin.png';
import twitter from '../assets/link-twitter.png';
import Link from 'react-router-dom/Link';

export default function Footer() {

    return [
        <div>

<div className="category col-md-4" style={{ backgroundColor: "#131c2a" }}>
                <Box minHeight="10vh" width="100vw"/>


                <Grid container alignItems="center" justify="center" spacing={0} style={{}}>
                    <Grid item xs={12} md={3} lg={2}  style={{marginTop: "20px"}} >
                    <a href="https://blog.hustlehub.ca/index.php/2021/04/02/what-is-hustlehub/" style={{ textDecoration: 'none' }}>
                        <Typography style={{ color: "#DFC168", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>About Us</Typography>
                    </a>
                    </Grid>
                    <Grid item xs={12} md={3} lg={2} style={{marginTop: "20px"}} >
                    <Link to="/signup/"  style={{ textDecoration: 'none' }} >
                        <Typography style={{ color: "#DFC168", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>Become a Hustler</Typography></Link>
                    </Grid>

                    <Grid item xs={12} md={3} lg={2}  style={{marginTop: "20px"}} >
                    <a href="https://blog.hustlehub.ca/" style={{ textDecoration: 'none' }}>
                        <Typography style={{ color: "#DFC168", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>Blog</Typography>
                        </a>
                    </Grid>

                    <Grid item xs={12} md={3} lg={2}  style={{marginTop: "20px"}} >
                    <Link to="/terms/"  style={{ textDecoration: 'none' }} >
                        <Typography style={{ color: "#DFC168", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20, }}>Terms of Service</Typography>
                    </Link>
                    </Grid>
                 

                </Grid>

                <Box height="10vh" />

                <Typography variant="h5" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20, }}>
                    Follow us:
            </Typography>

            <Box height="4vh" />

                <Box style={{ display: "flex", flexDirection: "row", justifyContent:'center', alignItems: 'center'}}>


                <a href="https://www.facebook.com/hustlehub.ca" >
                <img src={facebook} alt="Facebook" style={{maxHeight:"35px", paddingTop:"5px"}}/>
                </a>

                <Box width="4vh"></Box>

                <a href="https://www.instagram.com/hustlehub.ca/" >
                <img src={ig} alt="Instagram" style={{maxHeight:"35px", paddingTop:"5px"}}/>
                </a>

                <Box width="4vh"></Box>


                <a href="https://www.linkedin.com/company/hustlehub-ca" >
                <img src={linkedin} alt="LinkedIn" style={{maxHeight:"35px", paddingTop:"5px"}}/>
                </a>

                <Box width="4vh"></Box>

                <a href="https://twitter.com/hustlehub_ca" >
                <img src={twitter} alt="Twitter" style={{maxHeight:"35px", paddingTop:"5px"}}/></a>

                </Box>


                <Box height="16vh" />
            </div>



            <div className="category col-md-4" style={{ backgroundColor: "#080d13" }}>
                <Box height="3vh" />
                <Typography variant="h5" align="center" style={{ color: "white", backgroundColor: colors.black, fontSize: 15, }}>
                    © HustleHub, 2021. Made in London, Ontario with ♥
  </Typography>
                <Box height="3vh" />
            </div>
        </div>
      ];

}