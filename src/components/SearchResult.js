import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { colors, Divider } from '@material-ui/core';
import star from "../assets/icons/star.png";
import hustlehub from "../assets/icons/hustlehub.png";
import Link from 'react-router-dom/Link';
import PortfolioImages from './PortfolioImages';

export default function SearchResult(props) {

    const hustle = props.hustle;
    const user = hustle.hustlerId.userId;
    const hustler = hustle.hustlerId;
    const booked = props.booked;
    const bookOpen = props.bookOpen;
    
    const description = hustle.description || hustler.about;

    return [
        <div>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>

                <Avatar src={hustler.profilePic} style={{ height: 90, width: 90 }} />
                <Box height="2vh" />
                <Typography align="left" style={{ color: "black", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>{user.firstName + " " + user.lastName}</Typography>

                <Box height="1vh" />

                {
                    hustler.numJobsDone ?
                        [
                            <Box style={{ display: "flex", flexDirection: "row", }}>
                                <img alt="Jobs done" align="left" src={hustlehub} style={{ maxHeight: "15px" }} />
                                <Box width="1vh" />
                                <b>{hustler.numJobsDone} </b> &nbsp;jobs done
                            </Box>,
                            <Box height="1vh" />
                        ]
                        : <Box />

                }

                {
                    hustler.rating ?
                        [
                            <Box style={{ display: "flex", flexDirection: "row", }}>
                                <img alt="Rating" align="left" src={star} style={{ maxHeight: "15px" }} />
                                <Box width="1vh" />
                                <b>{hustler.rating * 10}% </b> &nbsp;rating
                            </Box>,
                            <Box height="2vh" />
                        ]
                        : <Box />

                }


                <Box align="left" width="100%">
                    <Typography variant="h5" align="left" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 18 }}><i>
                        {description}</i>
                    </Typography>
                </Box>


                
       
                    <Box maxHeight="200px">
                    <PortfolioImages hustle={hustle} openImagePopup={props.openImagePopup} maxHeight="140px"></PortfolioImages>
         
                    </Box>
                    
       
  
 
       

                <Box height="2vh" />
                
                <Box align="left">
                    {
                        !booked 
                        // ? <BookingPopup showSearch={showSearch} hideSearch={hideSearch} hustle={hustle}></BookingPopup>
                        ? <Button variant="outlined" color="primary"  style={{background: "#E1F9FF", marginRight: "20px"}}  onClick={()=>bookOpen(hustle)}>Contact</Button>
                        :<Button variant="outlined" color="disabled" style={{marginRight: "20px"}} disabled={true}>Request Sent</Button>
                    }

                

                    <Link to={"/profile/" + hustler._id} style={{ textDecoration: 'none' }}>
                        <Button color="primary">View Full Profile</Button></Link>
                </Box>


            </Card>
        </div>
    ];
}