import React from 'react'

import { Document, Page, pdfjs } from 'react-pdf';
import doc from '../../assets/HustleHub-Terms-of-Service.pdf'
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import api from "../../api";
import { useHistory } from "react-router-dom";

const TermsOfServicePage = () => {

    const [numPages, setNumPages] = useState([]);
    let history = useHistory();


    function onDocumentLoadSuccess({ numPages }) {

        let x = []

        for (let i = 1; i <= numPages; i++) {
            x.push(i);
        }

        setNumPages(x);
    }

    async function onAccept() {
        try {
            await api.user.acceptTermsAndService();
            history.push("/setup-payment/");

        }
        catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [])

    return (
        <Box align="center">
            <Typography style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px", color: "#818181" }}>Terms of Service</Typography>
            <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
                <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <List style={{ maxHeight: '1000px', overflow: 'auto' }} >
                        <Document
                            file={doc}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            {numPages.map(page => (
                                <Page pageNumber={page} />
                            ))}
                        </Document>
                    </List>
                </Paper>
            </Grid>
            <Typography style={{ marginTop: "10px" }}>By accepting, you agree you've read and agree to the Terms of Service </Typography>
            <Button color="primary" variant="outlined" style={{ background: "#E1F9FF", margin: "10px" }} onClick={onAccept}>Accept</Button>
        </Box>
    )
}

export default TermsOfServicePage