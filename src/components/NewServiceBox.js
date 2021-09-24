import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { colors, Grid, IconButton } from '@material-ui/core';
import Image from 'material-ui-image'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import api from "../api";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffTwoTone from '@material-ui/icons/HighlightOffTwoTone';
import loading from '../assets/loading.gif';

export default function NewServiceBox(props) {

    let [hustle, setHustle] = useState(props.hustle);

    const currentSelectedService = hustle?.serviceId ? { label: hustle?.serviceId?.name, value: hustle?.serviceId?._id } : null;

    let [services, setServices] = useState([]);
    let [selectedService, setSelectedService] = useState(currentSelectedService);
    let [getQuote, setGetQuote] = useState(hustle?.getQuote);
    let [description, setDescription] = useState(hustle?.description);
    let [rate, setRate] = useState(hustle?.hourlyRate || 20);
    let [isChanged, setIsChanged] = useState(false);
    let [isUploading, setIsUploading] = useState(false);

    const onPhotoChanged = async (e) => {
        setIsUploading(true);
        await uploadPhotos(e.target.files);
        setIsUploading(false);
    };

    const uploadPhotos = async (files) => {
        const formData = new FormData();
        // formData.append("pics", files);
        for (let i = 0; i < files.length; i++) {
            formData.append(`pics[${i}]`, files[i]);
        }
        formData.append(`length`, files.length);
        try {
            let response = await api.portfolio.addPhotos(hustle?._id, formData);
            let _hustle = response.data.hustle;
            setHustle(_hustle);
        }
        catch (error) {
            console.error(error);
        }
        
        
    };

    const files = hustle.files;


    function PortfolioImages() {
        if (!files) return <Box />

  
        let _images = files.slice(0, 2);
        let _expandImage = files[2];


        async function deletePhoto(file){
            try {
               let response = await api.portfolio.deletePhoto(hustle?._id, file._id);
                let _hustle = response.data.hustle;
                setHustle(_hustle);
            }
            catch (error) {
                console.error(error);
            }
        }

        return <Grid container alignItems="center" justify="center" spacing={0}>
            {
                _images.map((file, index) => {

                    return <Grid xs={10} sm={3} md={10} lg={3} key={index}>
                         <Box height="110px" width="110px" padding="10px" style={{position: "relative"}}>
                         
                            <Image 
                            
                                // src={`PREPEND_IMAGE_URL/${image}`}
                                src={file.url}
                                cover={false}
                                onClick={() => console.error('onClick:', file)}
                                aspectRatio={(1 / 1)}
                            // disableSpinner
                            />   
                            <IconButton onClick={()=>deletePhoto(file)} style={{position: "absolute", bottom: "80px", left: "80px", }}><HighlightOffTwoTone style={{ color: "#05C9FF" }}></HighlightOffTwoTone></IconButton>
                        </Box>

                    </Grid>
                })
            }


            {
                _expandImage ?
                    <Grid xs={10} sm={3} md={10} lg={3}>
                        <Box padding="10px" height="110px" width="110px" >
                            <Box style={{
                                background: `url(${_expandImage.url})`, /*Random image I grabbed*/
                                backgroundSize: "cover",
                                aspectRatio: "1"
                            }}>
                                <Box style={{
                                    color: "white",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Typography variant="h5" style={{ color: "white" }}> + {files.length - 2} </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    : <Box />
            }
            {
                isUploading ? <Box height="110px" width="110px" align="center"  style={{marginTop: "10px", backgroundColor: "white", borderRadius: '20px', backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23DADADAFF' stroke-width='8' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}>
                    <img src={loading} style={{height: "50px", marginTop: "30px"}}></img>
                    </Box> : <Box></Box>
            }

            <Box style={{height: "130px"}}>
            <Button   component="label" style={{marginTop: "10px", backgroundColor: "white", borderRadius: '20px', backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23DADADAFF' stroke-width='8' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}>
                
                <input
                    type="file"
                    multiple
                    hidden
                    onChange = {(newValue) => onPhotoChanged(newValue)} 
                />
                <Box height="100px" width="100px" style={{}}>
                    <AddIcon style={{ fontSize: "40px", paddingTop: "30px", color: "#09C9FD", }}></AddIcon>
                   
                </Box>
            </Button>
            </Box>
        </Grid>
    }

    const onGetQuoteChange = (event) => {
        setGetQuote(event.target.checked);
        setIsChanged(true);
    };



    const onRateChanged = (e) => {
        setRate(e.target.value);
        setIsChanged(true);
    };


    const onDescriptionChanged = (e) => {
        setDescription(e.target.value);
        setIsChanged(true);
    };

    const onSaveChanged = async () => {
        if (!hustle) return;
        // setSavingLoading(true); //TODO show some sort of loading when its saving the hustle
        try {
            await api.hustler.setService(hustle._id, selectedService.value);
            await api.hustler.setDescription(hustle._id, description);
            await api.hustler.setGetQuote(hustle._id, getQuote);
            await api.hustler.setHourlyRate(hustle._id, rate);
        }
        catch (error) {
            console.error(error);
        }
        setIsChanged(false);
    }

    const onRemove = async () => {
        if (!hustle) return;
        // setSavingLoading(true); //TODO show some sort of loading when its saving the hustle
        try {
            await api.hustler.remove(hustle._id);
            if (props.onRemove) props.onRemove(hustle._id);
        }
        catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        let mounted = true;

        //Gets list of services
        api.service.getServices()
            .then(response => {
                const services = response.data.services;
                if (mounted) {
                    setServices(services)

                }
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                    }
                }
            })
        return () => mounted = false;
    }, [])

    return <Card style={{ padding: "40px", margin: "10px" }}>
        <Grid>
            <Select
                options={services.map((service) => { return { label: service.name, value: service._id }; })}
                onChange={service => {
                    setSelectedService(service);
                    setIsChanged(true);
                }}
                value={selectedService}
                placeholder="Choose Service"
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop="20px">

                {!getQuote ? <Box alignItems="center" display="flex" justifyContent="center" flexDirection="row">

                    <Box alignItems="center" display="flex" justifyContent="center" flexDirection="row">
                       
                        <Box display={{ xs: 'none', md: 'block' }}>
                            <Typography>
                                Select your hourly rate: &nbsp;
                            </Typography>
                        </Box>


                        <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20 }}>
                            $ </Typography>



                        <TextField
                            style={{ paddingLeft: "10px", width: "60px" }}
                            variant="outlined"
                            rows={1}
                            rowsMax={1}
                            onChange={onRateChanged}
                            margin="dense"
                            defaultValue={rate ? rate : 20}
                        />


                        <Typography variant="h1" align="center" style={{ color: "#707070", backgroundColor: colors.black, fontSize: 20, paddingLeft: '10px' }}>
                            /hr</Typography>

                    </Box>
                </Box>
                    : <Box height="50px"></Box>}
            </Box>

            <Box display={{ xs: 'block', md: 'none' }} height="30px"></Box>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={getQuote}
                        onChange={onGetQuoteChange}
                        name="checkedGetQuote"
                        color="primary"
                    />
                }
                label='Display "Request a Quote" instead of an hourly rate'
            />
        </Grid>
        <Grid>
            <TextField
                style={{ paddingTop: "20px" }}
                fullWidth
                variant="outlined"
                placeholder="Talk about what you do"
                multiline={true}
                rows={3}
                rowsMax={3}
                onChange={onDescriptionChanged}
                defaultValue={description ? description : ""}
            />
        </Grid>


        <Box style={{ paddingTop: "30px" }}>
            <Typography style={{ color: "#ADADAD", paddingBottom: '10px' }}>Add photos (optional)</Typography>
            <PortfolioImages></PortfolioImages>
        </Box>


       
        <Grid container alignItems="center" justify="center" spacing={0} style={{paddingTop: "30px"}}>

            <Grid>
            {
                isChanged ?
                    <Button onClick={onSaveChanged} color="primary" variant="outlined" style={{ background: "#E1F9FF", marginLeft: "20px", marginRight: "20px" }}><b>Save Changes</b></Button>
                    : <Button disabled={true} color="primary" variant="contained" style={{ background: "#FFFFFF",  marginLeft: "20px", marginRight: "20px"  }}><b>Saved</b></Button>
            }</Grid>

            <Grid>
            <Button onClick={onRemove} style={{ color: "#DB0000", marginLeft: "20px", marginRight: "20px"   }}><b>Remove</b></Button>
            </Grid>
        </Grid>
        




    </Card>
}
