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
import Footer from '../../components/Footer';

const TermsOfServiceFooterPage = () => {

    const [numPages, setNumPages] = useState([]);


    function onDocumentLoadSuccess({ numPages }) {

        let x = []

        for (let i = 1; i <= numPages; i++) {
            x.push(i);
        }

        setNumPages(x);
    }



    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [])

    return (
        <Box align="center">
            <Typography style={{fontWeight: "bold", fontSize: "20px", marginTop: "20px", color: "#818181"}}>Terms of Service</Typography>
            <Grid xs={12} md={6} style={{marginTop: "20px"}}>
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
            <Box height="40px"></Box>
            <Footer></Footer>
        </Box>
    )
}

export default TermsOfServiceFooterPage