import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../../../components/Footer';
import profile_behind from "../../../assets/profile_behind.png";
import pin from "../../../assets/icons/pin.png";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import 'react-calendar/dist/Calendar.css';
import Avatar from '@material-ui/core/Avatar';
import api from "../../../api";
import { useState, useEffect } from 'react';
import AvailabilityEditableDisplay from "../../../components/AvailabilityEditableDisplay.js";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useUser } from "../../../state/UserContext";
import AddServicesComponent from "../../signup/components/AddServicesComponent";
import Link from "react-router-dom/Link";
import { useHistory } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function UserProfilePage() {


    const [hustler, setHustler] = useState("")
    // const [hustles, setHustles] = useState([]);

    const [hasChanges, setHasChanges] = useState(false);
    const [about, setAbout] = useState("");
    const [alias, setAlias] = useState("");

    //Alias state => 0: not taken, 1: loading, 2: taken     
    const [aliasState, setAliasState] = useState(0);
    const [availability, setAvailability] = useState();
    const [hasTransportation, setHasTransportation] = useState();
    const [loading, setLoading] = useState(true);
    const [user] = useUser();
    const [photo, setPhoto] = useState(hustler?.profilePic);
    const [file, setFile] = useState("");
    const history = useHistory();


    const onPhotoChanged = (e) => {
        setFile(e.target.files[0]);
        setPhoto(URL.createObjectURL(e.target.files[0]));
        setHasChanges(true);
    };

    useEffect(() => {
        setHustler(user.hustlerId);
        setAbout(user?.hustlerId?.about);
        setAvailability(user?.hustlerId?.availability);
        setAlias(hustler?.alias);
        //setHasTransportation(user?.hustlerId?.hasTransportation);
        setLoading(false);
        setPhoto(hustler?.profilePic);
    }, [user])

    const onAboutChanged = (e) => {
        setHasChanges(true);
        setAbout(e.target.value);
    }

    const onAliasChanged = async (e) => {
        try {
            setAliasState(1);
 
            let response = await api.alias.isAliasAvailable(e.target.value);
            console.log("RESPONSE AALIAS", response);
            if (response.data.isAvailable == true){
                setHasChanges(true);
                setAlias(e.target.value);
                setAliasState(0);
            }
            
            else {
                setAliasState(2);
            }
        }
        catch (error) {
            console.error(error);
        }

    }

    const onAvailabilityChanged = (a) => {
        setHasChanges(true);
        setAvailability(a);
    };

    const onHasTransportationChanged = (e) => {
        setHasChanges(true);
        setHasTransportation(e.target.checked);
    }

    const onSave = async () => {
        try {
            await api.hustler.setAbout(about);
            await api.alias.setAlias(alias);
            await api.hustler.setAvailability(availability);
            if (file)
                await submitForm();
            setHasChanges(false);
            history.push("/profile/" + user?.hustlerId?._id);
        }
        catch (err0r) {
            console.error("EDIT PROFILE PAGE:", err0r);
        }
    }

    const submitForm = async () => {
        const formData = new FormData();
        formData.append("avatar", file);
        try {
            let response = await api.hustler.uploadAvatar(formData);
            console.log("uploaded avatar");
            setFile("");
        }
        catch (error) {
            console.error(error?.data);
            setPhoto(user?.hustlerId?.profilePic);
        }
    };

    return [
        <div>{!loading ? <div>
            
            <Box display={{ xs: 'none', sm: 'block', md: 'block' }}>
            
            <div className="category col-md-4" style={{ backgroundColor: "#2B2E2E" }}>
                <Box height="180px" />

                <img alt="Profile" src={profile_behind} style={{ maxHeight: "190px", position: "absolute", left: 100, right: 0, top: 140 }} />
                <Avatar src={photo ? photo : hustler?.profilePic} style={{ height: "180px", width: "180px", position: "absolute", left: 105, right: 0, top: 145 }} />
                {
                    hasChanges ?
                        <Button variant="outlined" color="primary" onClick={onSave} style={{ background: "#123D63", position: "absolute", right: 130, top: 180 }}>Save Changes</Button>
                        : <Link to={"/profile/" + user?.hustlerId?._id}><Button color="primary" style={{ position: "absolute", right: 130, top: 180 }}>No Changes</Button></Link>
                }
                <Link to={"/profile/" + user?.hustlerId?._id}>
                    <Button variant="outlined" color="primary" onClick={onSave} style={{ position: "absolute", right: 20, top: 180 }}>Cancel</Button>
                </Link>

            </div>
            </Box>

            <Box display={{ xs: 'block', sm: 'none', md: 'none' }}>
            
            <div align="center" style={{backgroundColor: "#F7F7F7"  }}>
                <Box height="60px" />
                {
                    hasChanges ?
                        <Button variant="outlined" color="primary" onClick={onSave} style={{ background: "#E1F9FF", marginRight: "20px", textDecoration: 'none'}}>Save Changes</Button>
                        : <Link to={"/profile/" + user?.hustlerId?._id} style={{textDecoration: 'none'}}><Button color="primary" style={{ marginRight: "20px", }}>No Changes</Button></Link>
                }
                <Link to={"/profile/" + user?.hustlerId?._id} style={{textDecoration: 'none'}}>
                    <Button variant="outlined" color="primary" onClick={onSave} style={{ }}>Cancel</Button>
                </Link>
    
                <Avatar src={photo ? photo : hustler?.profilePic} style={{ height: "120px", width: "120px", marginTop: "20px" }} />
       

            </div>
            </Box>


            <div className="category col-md-4" style={{ backgroundColor: "#F7F7F7" }}>
                <Box></Box>
              
               
                <Box display={{ xs: 'block', sm: 'none', md: 'none' }}>
                    <Typography align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 30 }}>{user?.firstName + " " + user?.lastName}</Typography>
                    <Button color="primary" variant="outlined" component="label">
                            Upload Profile Photo
                            <input
                                type="file"
                                hidden
                                onChange={(newValue) => onPhotoChanged(newValue)}
                            />
                        </Button>

                        <Box style={{ flexDirection: "row", marginTop: "20px" }}>

                            <img alt="Pin" align="center" src={pin} style={{ maxHeight: "15px" }} />
                            <Box height="10px" />
                            London, ON
                        </Box>
                </Box>

                <Box marginLeft="70px" paddingTop="100px" display={{ xs: 'none', sm: 'block', md: 'block' }}>
                    <Box marginLeft="50px">
                    <Typography align="left" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 30 }}>{user?.firstName + " " + user?.lastName}</Typography>
                    
                    </Box>
                    
                    <Box width="250px">
                    <Button color="primary" variant="outlined" component="label" >
                                Upload Profile Photo
                                <input
                                    type="file"
                                    hidden
                                    onChange={(newValue) => onPhotoChanged(newValue)}
                                />
                            </Button>
                    </Box>

                    <Box style={{ display: "flex", flexDirection: "row", marginLeft: "70px", marginTop: "20px" }}>

                    <img alt="Pin" align="left" src={pin} style={{ maxHeight: "15px" }} />
                    <Box width="1vh" />
                    London, ON
                    </Box>
                </Box>
                
               
         

            


                <Box height="1vh" />

                <Box style={{ display: "flex", flexDirection: "row", }}>

                    <Box width="3px" />

                    <Box style={{ display: "flex", flexDirection: "row", verticalAlign: "center" }} >

                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={state.checkedMorning}
                                    checked={hasTransportation}
                                    onChange={onHasTransportationChanged}
                                    name="hasVehicle"
                                    color="primary"
                                />
                            }
                            label="Has a vehicle"
                        /> */}
                    </Box>
                </Box>

                <Box height="5vh" />

                <Divider variant="middle" />
                <div className="category col-md-4" style={{ backgroundColor: "white", padding: "10px" }}>


                    <Box height="2vh" />

                    <Grid container >
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}  >

                            <Typography align="center" style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20 }}>About</Typography>
                            <Box height="2vh" />

                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                minHeight="1vh">

                                <Box align="center" width="60vh">

                                    <TextField
                                       
                                        placeholder="Talk about what you do"
                                        defaultValue={hustler?.about}
                                        multiline
                                        fullWidth
                                        variant="outlined"
                                        rows={4}
                                        rowsMax={4}
                                        onChange={onAboutChanged}
                                    />
                                </Box>

                            </Box>


                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >

                            <Box display={{ xs: 'none', sm: 'block', md: 'block' }} width="120px"/>
                          
                            <Box align="center" marginTop="40px" >

                                <Link to="/edit-availability/" style={{ textDecoration: 'none' }} > <Button variant="outlined" color="primary" style={{ marginTop: "20px", background: "#E1F9FF" }}>Edit Availability</Button></Link>


                                <Box marginTop='40px' maxWidth="400px" style={{ display: "flex", flexDirection: "row", }}>
                                <Typography style={{ color: "#707070", backgroundColor: colors.black, fontWeight: 'bold', fontSize: 20, marginTop: "15px", marginRight: "20px" }}>URL:</Typography>
                                <TextField
                                    
                                    defaultValue={hustler?.alias}
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    rows={1}
                                    rowsMax={1}
                                    onChange={onAliasChanged}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">hustlehub.ca/</InputAdornment>,
                                    }}
                                />
                                {aliasState === 0? 
                                <CheckCircleIcon style={{color: "#06D226", marginTop: "15px", marginLeft: "10px"}}></CheckCircleIcon> 
                                : aliasState===1? <Box width="45px"/> 
                                : <HighlightOffIcon style={{color: "#FD0000", marginTop: "15px", marginLeft: "10px"}}></HighlightOffIcon>
                                }
                                </Box>
                            </Box>
                        </Grid>


                    </Grid>

                    <Box height="10vh" />


                </div>


                <AddServicesComponent></AddServicesComponent>



                <Box height="5vh" />



            </div>


            <Footer></Footer>

        </div> : <Box></Box>}</div>
    ];
}