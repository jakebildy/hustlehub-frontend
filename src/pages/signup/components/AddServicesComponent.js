import React from 'react'

import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useUser } from "../../../state/UserContext";
import NewServiceBox from '../../../components/NewServiceBox';
import Footer from '../../../components/Footer';
import AddIcon from '@material-ui/icons/Add';
import api from "../../../api";
import { useHistory } from "react-router-dom";

export default function AddServicesComponent() {
    const [user] = useUser();
    let [hustles, setHustles] = useState([]);
   // let [loadingNewHustle, setLoadingNewHustle] = useState(false);

    useEffect(() => {
        let mounted = true;

        if (!user) {
            return; // no user, no hustles >:(;
        }

        //Gets list of services
        api.hustler.getHustlersHustles(user?.hustlerId?._id)
            .then(response => {
                const _hustles = response.data.hustles ? response.data.hustles : [];
                if (mounted) {
                    setHustles(_hustles)
                }
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
    }, [user]);

    const createNewHustle = async () => {
     //   setLoadingNewHustle(true);
        try {
            let _hustle = (await api.hustler.createHustle()).data.hustle;
            hustles.push(_hustle);
            setHustles([...hustles]);
        }
        catch (error) {
            console.error("Error creating a new hustle", error);;

        }
      //  setLoadingNewHustle(false);
        
    }

    const onRemove = (id) => {
        let _hustles = hustles.filter((hustle)=>{
            return hustle._id !== id;
        });
        setHustles(_hustles);
    }

    let history = useHistory();

    const nextPressed = () => {
        history.push("/add-photo/");
    }

    return (
        <Box>
            <Box align="center" paddingTop="30px" style={{ backgroundColor: "#F7F7F7" }} minHeight="700px">


                <Box padding="30px">
                    <Typography align="center" style={{ color: "#707070", fontWeight: 'bold', fontSize: 20, margin: '20px' }}>Services</Typography>
                    <Grid container
                        spacing={1}

                        alignItems="center"
                        justify="center">
                        {
                            hustles.map((hustle) => {
                                return (<Grid item xs={12} md={6} key={hustle?._id}>
                                            <NewServiceBox hustle={hustle} onRemove={onRemove}/>
                                        </Grid>)
                            })
                        }


                        <Grid item xs={12} md={6}>
                            <Button 
                                onClick={createNewHustle}
                                style={{ 
                                    padding: 20, 
                                    width: "100%", 
                                    textTransform: "none", 
                                    borderRadius: "5px", 
                                    backgroundColor: "#EBEBEB", 
                                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23DADADAFF' stroke-width='8' stroke-dasharray='15' stroke-dashoffset='15' stroke-linecap='square'/%3e%3c/svg%3e")` }}>
                                <Box>
                                    <Typography style={{ color: "#09C9FD", fontWeight: "bold", fontSize: "25px", paddingTop: "180px" }}>Click here to add a service</Typography>
                                    <AddIcon style={{ fontSize: "80px", color: "#09C9FD", height: "120px", paddingBottom: "180px" }}></AddIcon>
                                </Box>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

             
            </Box>

        </Box>

    )
}

