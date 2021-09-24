import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors, Paper } from '@material-ui/core';
import ServiceCarousel from '../../components/ServiceCarousel';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer'
import Grid from '@material-ui/core/Grid';
import { useUser } from "../../state/UserContext";

import { useHistory } from "react-router-dom";
import skyline from '../../assets/skyline.png';
import vancouver_skyline from '../../assets/skylines/VancouverSkyline.png';
import About_The_Site from '../../assets/About_The_Site.png';
import hustle from '../../assets/become_hustler/hustle.png';
import grow from '../../assets/become_hustler/grow.png';
import income from '../../assets/become_hustler/income.png';
import Card from '@material-ui/core/Card';
import { Link } from "react-router-dom";


//where it all begins
import hypeduck from '../../assets/HustleDuck.png';
import popularServices from "../../assets/json/popularService";
import Select from 'react-select';
import { useState, useEffect } from 'react';
import api from "../../api";
import BlueDot from "../../components/BlueDot";
import useCookie from 'react-use-cookie';

export default function LandingPage(props) {

    let history = useHistory();

    const [services, setServices] = useState([]);

    const [defaultLocation, setDefaultLocation] = useCookie('default-location', "");

    const [user] = useUser();

    const city = props.city;



    useEffect(() => {
      let mounted = true;
  
      //Gets list of services
      api.service.getServices()
          .then(response => {
              const services = response.data.services;
              if (mounted) {
                  setServices(services)
  
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

    const PopularService = (popularService) => {

        return <Link to={`/search/${popularService.name}`}>
            <Button>
                <Paper>
                <div style={{ backgroundColor: "#131c2a" }}>
                    <img src={popularService.photo} alt={popularService.name} width="200" height="250" style={{ objectFit: "cover" }}></img>
                    <Box height="0.5vh">
                    </Box>
                    <p style={{ color: "white" }}><b>{popularService.name}</b></p>
                    <Box height="0.5vh">
                    </Box>
                </div>

                </Paper>
            </Button>
        </Link>
    }

    return [
        <Box>

            <Box 
                minHeight="300px"
                padding="42.0px"
                style={{ 
                    backgroundColor: "#0384C6", 
                    backgroundImage:  city === "Vancouver, BC" ?   "url(" + vancouver_skyline+ ")" : "url(" + skyline+ ")", 
                    backgroundSize: "cover"
                }}>

                {/* <img src={skyline} style={{ maxHeight: "60vh", width: '100%', position: "absolute", left: 0, right: 0, top: 0, zIndex: 0 }}></img> */}
                {/* <img src={skyline} style={{ maxHeight: "300px", width: '100%' }}></img> */}

                <Box display={{ xs: 'none', md: 'block' }} padding="0" marginRight="25px">
                    <img src={hypeduck} alt="HustleDuck" style={{ maxHeight: "85vh", position: "absolute", left: 20, right: 0, top: 0 }}></img>
                </Box>


                <Typography variant="h4" align="center" style={{ color: "white", margin:"20px",}}>
                  <b>Get help with any task today</b>  
                </Typography>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >

                    {/* <Box align="center"  style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}> */}
                        {/* <Search style={{color:"#05C9FF", fontSize: 30, position: "absolute", left: 20, right: 0, top: '200px'}}></Search> */}
                        {/* <Box width="1vh" /> */}
                        <Grid container alignItems="center" justify="center" style={{margin:"30px"}}>
                            <Grid item xs={12} sm={8} md={5} lg={4} xl={4} >
                                {/* <Box> */}
                    
                                <Select
                                options={services.map((service) => { return { label: service.name, value: service._id }; })}
                                onChange={opt => history.push("/search/" + opt.label)}
                                placeholder="I need help with..."
                                />
                                {/* </Box> */}
                            </Grid>
                        </Grid>
                    {/* </Box> */}
                </Box>



              
                {!user ? 
                <Box>

                <Typography variant="h4" align="center" style={{ color: "white", fontSize: "18px", margin: "10px"}}>
                    Sign up to work and
                </Typography>
                <Link to="/signup/" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" style={{backgroundColor: '#DFC168', fontSize: 17, fontWeight: "bold"}} color="#0D3669">
                       <b>Start Making Money</b>
                    </Button>
                </Link></Box> : <Box/>} 
          
            </Box>

            <Box style={{ backgroundColor: "white" }}>
                <Box height="20vh" />
                <Typography variant="h5" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', marginBottom: "50px"}}>
                    Popular Services
                </Typography>

                <Box display={{ xs: 'none', md: 'block' }} padding="0" marginRight="25px" marginBottom="20px">
                    <ServiceCarousel/>
                </Box>

                <Box display={{ xs: 'block', md: 'none' }} padding="30px" marginRight="25px">
                    {PopularService(popularServices[0])}
                    {PopularService(popularServices[1])}
                    {PopularService(popularServices[2])}
                    {PopularService(popularServices[3])}
                </Box>
            </Box>



            <Box className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }} padding="30px" paddingBottom="50px">

                <Typography variant="h5" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold' }}>
                Passionate people available with the click of a button
                </Typography>


                <Grid container alignItems="center" justify="center" spacing={5}>
                    


                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >
                        <img alt="About The Site" src={About_The_Site} width={"100%"}></img>
                    </Grid>


                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
                  

                        <Typography variant="h5" align="left" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 21 }} >
                      

                        Build your team of local, peer reviewed workers to help with whatever you need.     </Typography>
                        <br></br> 
                        <Box display={{ xs: 'block', md: 'none' }} style={{height: "30px"}}></Box>

                        <BlueDot text="Compare Hustlers by reviews, price, and profiles"/> 

                        <Box display={{ xs: 'block', md: 'none' }} style={{height: "30px"}}></Box>

                        <BlueDot text="Select and connect directly with the best person for the job "/> 

                        <Box display={{ xs: 'block', md: 'none' }} style={{height: "30px"}}></Box>

                        <BlueDot text="Schedule a time that works for you - as soon as you need  "/> 

                        <Box display={{ xs: 'block', md: 'none' }} style={{height: "30px"}}></Box>

                        <BlueDot text="Review your history to book your favourite Hustlers again  "/> 
                       
                   
                    </Grid>

                </Grid>
            </Box>

            {/* 
            <div className="category col-md-4" style={{ backgroundColor: "white" }}>
                <Box height="5vh" />

                <Typography variant="h5" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold' }}>
                    Top Hustlers
            </Typography>

                <Box height="10vh" />

                <ServiceCarousel></ServiceCarousel>

                <Box height="10vh" />

            </div> */}

            <div className="category col-md-4" style={{ backgroundColor: "#0384C6",  padding: "15px"  }}>


            <Typography variant="h4" align="center" style={{ color: "white", backgroundColor: colors.black, fontWeight: "bold", padding: "15px" }} >
                Become a Hustler Risk-Free 
            </Typography>

        
            <Typography variant="h5" align="center" style={{ color: "#F9F9F9", backgroundColor: colors.black, padding: "15px"}}>
                <b>Free until you complete your first job</b>, then only $5 a month : 
            </Typography>

            <Grid container>


                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{marginTop: "20px"}}>
                <Card style={{margin: "10px", height: "100%"}}>

                    <Box m="2rem" style={{ backgroundColor: "white" }}>

                        <Box height="1vh" />
                        <Typography variant="h4" align="center" style={{ color: "#393939", backgroundColor: colors.black, fontWeight: "bold", fontSize: 20 }}>
                            Be your own boss
                        </Typography>
                        <img alt="Hustle" src={hustle} style={{ height: "250px"}}></img>

                        <Typography variant="h4" align="center" style={{ color: "#393939", backgroundColor: colors.black, fontSize: 20 }}>
                            <br></br>
                            HustleHub lets you decide
                            when you want to work,
                            and which jobs you want
                            to take. <br></br><br></br>

                            You’re the boss -
                            we just connect you with
                            new customers.
                            <br></br><br></br>
                            <br></br><br></br>
                        </Typography>
                    </Box>
                    </Card>
                </Grid>


                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{marginTop: "20px"}}>
                <Card style={{margin: "10px", height: "100%" }}>

                    <Box m="2rem" style={{ backgroundColor: "white" }}>

                        <Box height="1vh" />
                        <Typography variant="h4" align="center" style={{ color: "#393939", backgroundColor: colors.black, fontWeight: "bold", fontSize: 20 }}>
                            Set your own rates
                        </Typography>
                        <img alt="Set your own rates" src={income} style={{ height: "250px"}}></img>

                        <Typography variant="h4" align="center" style={{ color: "#393939", backgroundColor: colors.black, fontSize: 20 }}>
                            <br></br>
                            Charge as much as you want.
                            We don’t handle transactions,
                            or ask you for a cut.
                            <br></br><br></br>
                            Get paid in cash, eTransfer,
                            whatever works for you
                            and your clients.
                            <br></br><br></br>
                            <br></br><br></br>
                        </Typography>

                    </Box>
                    </Card>
                </Grid>



                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{marginTop: "20px"}} >
                    <Card style={{ margin: "10px", height: "100%"}}>
                        <Box m="2rem" style={{ backgroundColor: "white" }} padding={"10px"}>
                            <Typography variant="h4" align="center" style={{ color: "#393939", backgroundColor: colors.black, fontWeight: "bold", fontSize: 20 }}>
                                Grow your business
                            </Typography>
                            <img alt="Grow your business" src={grow} style={{ height: "250px"}}></img>

                            <Typography variant="h4" align="center" style={{ color: "#393939", backgroundColor: colors.black, fontSize: 20 }}>
                                <br></br>
                            We handle connecting you
                            with customers, so you can
                            focus on what you do best.
                            <br></br><br></br>
                            The more jobs you complete
                            and good reviews you get,
                            the more customers will be
                            likely to choose you for their
                            service needs.
                            <br></br>
                            </Typography>
                        </Box>
                    </Card>
                </Grid>




            </Grid>

            <Box height="5vh" />

            {!user ? <Box><Typography variant="h4" align="center" style={{ color: "white", fontSize: "18px", margin: "10px"}}>
                    Sign up to work and
                </Typography>
                <Link to="/signup/" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" style={{backgroundColor: '#DFC168', fontSize: 17, fontWeight: "bold"}} color="#0D3669">
                       <b>Start Making Money</b>
                    </Button>
                </Link></Box>  : <Box/>
            }

            <Box height="20vh" />


            </div>


            <Footer></Footer>


        </Box>
    ];
}