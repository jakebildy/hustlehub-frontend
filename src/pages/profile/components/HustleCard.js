import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Image from 'material-ui-image'
import React from 'react';
import PortfolioImages from '../../../components/PortfolioImages';


export default function SearchResult(props) {

  const hustle = props.hustle;
  const service = hustle.serviceId;
  const title = service ? service.name : "N/A";
  const priceText = (hustle.getQuote || !hustle.hourlyRate) ? "Book to Get a Quote" : `$ ${hustle.hourlyRate} / hr`;
  const description = hustle.description ? hustle.description : "";

  // const pics = hustle.files ? hustle.files : [];
  const bookOpen = props.bookOpen;

  // const openImagePopup = props.openImagePopup;

  const [open, setOpen] = React.useState(false);


  return <Card style={{ height: "100%", marginTop: "10px", paddingTop: "10px", display: "flex", flexDirection: "column" }}>
    <Grid>
      <Typography style={{ color: "#8D8D8D", fontSize: 20 }}>{title.toUpperCase()}</Typography>
      <Typography style={{ color: "#05A4D0", fontWeight: 'bold', fontSize: 17 }}>{priceText}</Typography>
    </Grid>
    <Grid>
      <Typography style={{ marginLeft: "10px", marginRight: "10px" }}><i>{description}</i></Typography>
    </Grid>
    <Box style={{ flexGrow: 1 }}></Box>
    <PortfolioImages hustle={hustle} openImagePopup={props.openImagePopup}></PortfolioImages>
    <Box style={{ flexGrow: 1 }}></Box>
    <Box style={{ paddingBottom: "20px", position: "relative" }}>
      <Button color="primary" variant="outlined" style={{ background: "#E1F9FF", }} onClick={() => bookOpen(hustle)}><b>Contact</b></Button>
    </Box>




  </Card>
}
