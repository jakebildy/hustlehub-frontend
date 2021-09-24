import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';
import Image from 'material-ui-image';

export default function PortfolioImages(props) {

    const openImagePopup = props.openImagePopup;

    const pics = props.hustle.files ? props.hustle.files : [];
  

    if (!pics) return <Box/>
    let _pics = pics.filter((image)=>image);
    
    let imageGridSize = 3;
    if (_pics.length === 1) imageGridSize = 10;
    if (_pics.length === 2) imageGridSize = 5;
    if (_pics.length > 2) imageGridSize = 3;
    _pics = pics.slice(0, 2);
    let _expandImage = pics[2];
    

    return <Grid container alignItems="center" justify="center" spacing={0} style={{marginTop: "10px"}}>
      {
        _pics.map((pic, i)=>{

          return <Grid item xs={imageGridSize}>
            <Box padding="2px" maxHeight={props.maxHeight}>
              <Image
                src={pic.url}
                onClick={() => openImagePopup(pics.map(p => p.url), i)}
                aspectRatio={(1/1)}
                cover={true}
                imageStyle={{maxHeight: props.maxHeight, maxWidth: props.maxHeight}}
                style={{maxHeight: props.maxHeight, maxWidth: props.maxHeight}}
                // disableSpinner
              />
              
            </Box>
          </Grid>
        })
      }

      {
        _expandImage?
        <Grid xs={imageGridSize}>
          <Box padding="2px" maxHeight={props.maxHeight}>
            <Box
            maxHeight={props.maxHeight}
             onClick={() => openImagePopup(pics.map(p => p.url), 2)}
             style={{
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
                <Typography variant="h5" style={{color: "white"}}> + {pics.length-2} </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        :<Box/>
      }
    </Grid>
  }
