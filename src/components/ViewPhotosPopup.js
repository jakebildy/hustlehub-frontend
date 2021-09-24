import React from "react";
import Box from '@material-ui/core/Box';
import { Grid } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';

export default function ViewPhotosPopup(props) {

    let [imgIndex, setImgIndex] = useState(props.index);

    const IMAGES = props.images || ["https://ih1.redbubble.net/image.440022475.4169/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg", "https://pbs.twimg.com/profile_images/1194436151710535681/TbCNX2AZ_400x400.jpg", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8e556ca2-c765-485d-953d-0d7b6abb7398/d4u6776-e7bb1ce5-5361-4063-84bd-f2dd19d059a4.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhlNTU2Y2EyLWM3NjUtNDg1ZC05NTNkLTBkN2I2YWJiNzM5OFwvZDR1Njc3Ni1lN2JiMWNlNS01MzYxLTQwNjMtODRiZC1mMmRkMTlkMDU5YTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uJ1AATAuy_klwrCnONeCGJBVyBnc-EOpY6k1WfkWS2g"];

    const CLOSE_FUNCTION = props.close;

    function next() {
        setImgIndex((imgIndex + 1) % IMAGES.length);
    }

    function previous() {

        if (imgIndex == 0) {
            setImgIndex(IMAGES.length - 1);
        }
        else {
            setImgIndex((imgIndex - 1) % IMAGES.length);
        }
    }

    return <Box width="100%">
        <Grid container >
            <Grid xs={1} md={2} align="center">

            <IconButton style={{ backgroundColor: "#707070" }} onClick={CLOSE_FUNCTION} children={<CloseIcon style={{ color: "white" }} />} />

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="calc(100% - 95px)"
                >

                    <IconButton style={{ backgroundColor: "#707070" }} onClick={previous} children={<ChevronLeftIcon style={{ color: "white" }} />} />
                </Box>

            </Grid>
            <Grid xs={10} md={8} justify="center" justifyContent="center" alignItems="center" align="center">
                <img width="100%" src={IMAGES[imgIndex]}></img>
                <Typography style={{ color: "white" }}>{imgIndex + 1}/{IMAGES.length}</Typography>
            </Grid>
            <Grid xs={1} md={2} align="center">

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100%"
                >

                    <IconButton style={{ backgroundColor: "#707070" }} onClick={next} children={<ChevronRightIcon style={{ color: "white" }} />} />
                </Box>

            </Grid>
        </Grid>
    </Box>

}