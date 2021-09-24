import duck from '../assets/NoResults.png';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import Button from '@material-ui/core/Button';


export default function NoResultsDuck(props) {

    let name = props.name;

    return <Box>
    <img src={duck} alt="No results" style={{maxHeight:"200px"}}></img>
    <Typography style={{color: "gray", fontWeight: "bold"}}>We couldn't find anyone offering <i>{name}</i> yet.<br></br> </Typography>
    {/* <Box height="10px"></Box> */}

    <Box>

                <Typography align="center" style={{ color: "gray", fontWeight: "bold", marginBottom: "10px", marginTop: "20px"}}>
                    Be the first to sign up for <i>{name}</i> and
                </Typography>
                <Link to="/signup/" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" style={{backgroundColor: '#DFC168', fontSize: 17, fontWeight: "bold"}} color="#0D3669">
                       <b>Start Making Money</b>
                    </Button>
                </Link></Box> 
    </Box>;
}



