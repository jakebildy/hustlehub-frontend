import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import useCookie from 'react-use-cookie';

export default function NavbarBanner(){

    const [hasClosedBanner, setHasClosedBanner] = useCookie('londonBanner', false);

    function closeBanner() {
        setHasClosedBanner(true);
    }

    return <Box> { hasClosedBanner ? <Box></Box> :
        <AppBar elevation={0} position="sticky" style={{ backgroundColor: "#05C9FF"}}>

        <Box display="flex" flexDirection="row">
            <Box flexGrow={1}>
            <Typography style={{color: "white", fontSize: "20px", fontWeight: "bold", marginLeft: "20px", marginTop: "10px"}}>We're new to London! Sign up and be one of the first people to post your services!</Typography>
            </Box>
            <Box>
                <IconButton style={{color: "white"}} onClick={closeBanner}><CloseIcon ></CloseIcon></IconButton>
            </Box>
        </Box>
       
    </AppBar>}</Box>;
}