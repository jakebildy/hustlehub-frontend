import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import api from "../api";
import { useState, useEffect } from 'react';
import Link from 'react-router-dom/Link';

export default function SearchBox(){
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const SearchMenu = withStyles({
        paper: {
          border: '1px solid #d3d4d5',
          width: '100%',
          margin: '10px',
          maxHeight: '160px'


        },
      })((props) => (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...props}
        />
      ));

      const [services, setServices] = useState([]);

      useEffect(() => {
          let mounted = true;
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

    return <Box>
            <Button startIcon={<SearchIcon></SearchIcon>} onClick={handleClick} fullWidth={true} style={{border: '1px grey', backgroundColor: 'white', textTransform: 'none', }}>
                <Typography style={{color: "gray"}}>
                I'm looking for...
                </Typography>
            </Button>
            <SearchMenu
                 id="customized-menu"
                 anchorEl={anchorEl}
                 keepMounted
                 fullWidth={true}
                 style={{width: "400px"}}
                 open={Boolean(anchorEl)}
                 onClose={handleClose}>
        

                   { services.map((service)=> {
                            return (
                                <Link to={`/search/${service.name}`}  style={{color: "black", textDecoration: 'none' }}>
                                    <MenuItem>
                                    <ListItemText primary={service.name} />
                                    </MenuItem>
                                </Link>
                            )
                        }) 
                    }

                
           
            </SearchMenu>
        </Box>;
}