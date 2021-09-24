import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';



export default function AvailabilityDisplay(props){

    const hustler = props.hustler;

    return [

        <Box style={{ display: "flex", flexDirection: "row", }}>


            <Box width="20px"></Box>

            <Box>
            <Box height="30px"> </Box>

            <Box height="36px">    
            <Typography  align="left" style={{ color: "gray",fontSize: 15, }}>9AM - 12PM</Typography> 
            </Box>

            <Box height="36px">    
            <Typography  align="left" style={{ color: "gray",fontSize: 15, }}>12PM - 5PM</Typography> 
            </Box>

            <Box height="36px">    
            <Typography  align="left" style={{ color: "gray",fontSize: 15, }}>5PM - 9PM</Typography> 
            </Box>

            </Box>

            <Box width="10px"/>


            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>M</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[0][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[0][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[0][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>


            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>T</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[1][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[1][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[1][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>

            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>W</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[2][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[2][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[2][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>

            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>T</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[3][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[3][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[3][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>

            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>F</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[4][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[4][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[4][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>

            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>S</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[5][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[5][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[5][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>

            <Box>
            <Box height="20px" width="30px" >
            <Typography  align="center" style={{ color: "gray",fontSize: 15, }}><b>S</b></Typography>
            </Box>
                <Box height="30px" width="30px"  border={3} borderColor="white" style={{backgroundColor: hustler.availability[6][0] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"  border={3}  borderColor="white" style={{backgroundColor: hustler.availability[6][1] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
                <Box height="30px" width="30px"   border={3} borderColor="white"  style={{backgroundColor: hustler.availability[6][2] ? "#05C9FF" : "#E2E2E2", borderRadius: "6px"}}></Box>
            </Box>
            
        </Box>

        
    ];
}