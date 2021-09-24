import React from 'react'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Footer from '../../components/Footer';
import { useHistory } from "react-router-dom";
import AddServicesComponent from './components/AddServicesComponent';

export default function AddServicesPage() {


    let history = useHistory();

    const nextPressed = () => {
        history.push("/add-photo/");
    }

    return (
        <Box>
            <AddServicesComponent></AddServicesComponent>
            <Box align="center" paddingTop="30px" style={{ backgroundColor: "#F7F7F7" }} >

            <Button variant="outlined" color="primary" onClick={nextPressed} style={{marginBottom: "20px", background: "#E1F9FF",}}>Next</Button>
            </Box>
            <Footer></Footer>
        </Box>

    )
}

