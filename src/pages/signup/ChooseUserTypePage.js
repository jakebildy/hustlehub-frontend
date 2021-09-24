import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../components/Footer';
import { useUser } from "../../state/UserContext";
import { useHistory } from "react-router-dom";
import api from "../../api";
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import userPic from '../../assets/user_type/user.png';
import hustlerPic from '../../assets/user_type/hustler.png';
import Grid from '@material-ui/core/Grid';


export default function ChooseUserTypePage() {
    let history = useHistory();

 //   let [loading, setLoading] = useState(false);
  //  let [errorMessage, setErrorMessage] = useState(false);
    const [user] = useUser();

    // TODO: If not logged in redirect.
    // TODO: If already a hustler redirect to home page.

    const createHustler = () => {
    //   setLoading(true);
        let userId = user._id;
        api.hustler.createHustler({})
            .then(response => {
          //      setErrorMessage(false);
                history.push("/add-services/");
            })
            .catch(error => {
                console.error(error);
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                //        setErrorMessage(error.response.data.message);
                    }
                }
                // history.push("/select-services/");
            })
            .finally(() => {
        //        setLoading(false);
            });
    };


    const becomeUser = () => {
        history.push("/search/");
    };

    return [
        <div>


            <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7", padding: "20px" }}>

                <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 30, paddingTop: "20px",  paddingBottom: "20px" }}>
                    Are you looking to find a service or sell a service?</Typography>



       
                {/* <Box style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}> */}
                <Grid container alignItems="center" justify="center" spacing={5}>
                <Grid item xs={12} md={6}  >
                    <Card>
                        <Box padding="40px" style={{display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                            <Typography variant="h2" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 25 }}>
                                Find a Service</Typography>

                            {/* <Box height="10vh" /> */}
                            <Avatar src={userPic} style={{ height: 150, width: 150, margin: 35, marginBottom:45 }} />


                            <Typography variant="h2" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20 }}>
                                I’m looking to find someone for a job</Typography>
                            <Box height="5vh" />
                            <Button variant="outlined" color="primary" onClick={becomeUser}>
                                Select
                            </Button>
                        </Box>
                    </Card>
                    </Grid>

                    <Grid item xs={12} md={6}  >
                    <Box width="10vw" />
                    <Card>
                        <Box padding="40px" style={{display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                            <Typography variant="h2" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: "bold", fontSize: 25 }}>
                                Sell a Service</Typography>

                            {/* <Box height="10vh" /> */}
                            <Avatar src={hustlerPic} style={{ height: 150, width: 150, margin: 35, marginBottom:45  }} />


                            <Typography variant="h2" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20 }}>
                                I’m looking to advertise my services</Typography>
                            <Box height="5vh" />
                            <Button variant="outlined" color="primary" onClick={createHustler}>
                                Select
                            </Button>
                        </Box>
                    </Card>
                    </Grid>
                </Grid>



                <Box height="40vh" />
            </div>

            <Footer></Footer>

        </div>
    ];
}