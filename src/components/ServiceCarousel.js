import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from "react-router-dom";
import cleaning from '../assets/popular/Cleaning.png';
import handyman from '../assets/popular/Handyman_Services.png';
import landscaping from '../assets/popular/Landscaping.png';
import painting from '../assets/popular/Painting.png';
import photography from '../assets/popular/Photography.png';
import dogwalking from '../assets/popular/Dog_Walking.png';
import hairdressing from '../assets/popular/Hairdressing.png';
import tutoring from '../assets/popular/Tutoring_.png';

export default function ServiceCarousel(props) {

    var items = [[
        {
            name: "Painting",
            url: "https://thepaintpeople.com/wp-content/uploads/2017/05/wallpainter.jpg",
            photo: painting
        },
        {
            name: "Photography",
            url: "https://expertphotography.com/wp-content/uploads/2020/07/social-media-for-photographers-follow-1.jpg",
            photo: photography

        },
        {
            name: "Tutoring",
            url: "https://petsittersireland.com/wp-content/uploads/2012/05/Why-Hire-A-Dog-Walker.jpg",
            photo: tutoring

        },
        {
            name: "Handyman",
            url: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-flooring-hero-A.jpg",
            photo: handyman

        }],
    [
        {
            name: "Hairdressing",
            url: "https://www.yourjobcost.co.uk/images/job-images/drywall.jpg",
            photo: hairdressing


        },
        {
            name: "Dog Walking",
            url: "https://www.donerightroofing.ca/wp-content/uploads/2020/07/residential-roofing-installation-services.jpg",
            photo: dogwalking

        },
        {
            name: "Landscaping",
            url: "https://certifiedgreencleaning.com/wp-content/uploads/2020/02/HowAnOfficeCleaningServiceCanImproveBusiness.jpg",
            photo: landscaping


        },
        {
            name: "Cleaning",
            url: "https://s32913.pcdn.co/wp-content/uploads/2020/02/deck-building-1080x675.jpeg",
            photo: cleaning
        }],
    ]


    return (


        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="1vh">

            <Box align="center" width="150vh">

                <Carousel
                    NextIcon={<ChevronRightIcon style={{ color: "#05C9FF", fontSize: "50" }} />}
                    PrevIcon={<ChevronLeftIcon style={{ color: "#05C9FF", fontSize: "50" }} />}
                    navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                        style: {
                            backgroundColor: 'white',
                        }
                    }}

                >

                    {
                        items.map((item, i) => <Box style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                            <Item key={i} item={item[0]} />
                            <Box width="2vh" />
                            <Item key={i} item={item[1]} />
                            <Box width="2vh" />
                            <Item key={i} item={item[2]} />
                            <Box width="2vh" />
                            <Item key={i} item={item[3]} />
                        </Box>)
                    }
                </Carousel>

            </Box>
        </Box>
    )
}



function Item(props) {
    let history = useHistory();

    const onClickCard = (e) => {
        history.push("/search/" + props.item.name);
        window.scrollTo(0, 0);
    };

    return (
        <Button onClick={onClickCard}>
            <Paper>

                <div style={{ backgroundColor: "#131c2a" }}>
                    {/* <img src={props.item.url} width="200" height="250" style={{objectFit: "cover"}}></img> */}
                    <img alt="Service" src={props.item.photo} width="200" height="250" style={{ objectFit: "cover" }}></img>
                    <Box height="0.5vh">
                    </Box>
                    <p style={{ color: "white" }}><b>{props.item.name}</b></p>
                    <Box height="0.5vh">
                    </Box>
                </div>

            </Paper>
        </Button>
    )
}