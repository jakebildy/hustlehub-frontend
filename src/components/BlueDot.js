import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function BlueDot(props){

    const text = props.text;

    return <Box display="flex" flexDirection="row" alignItems="center" ><Typography style={{color: "#05C9FF", fontSize: "30px"}}>•</Typography>
    <Typography style={{ color: "#707070", fontSize: 21, paddingLeft: "10px" }}>{text}</Typography></Box>
}