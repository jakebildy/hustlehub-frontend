import React from "react";
import logo from '../assets/hustlehub.svg'
import logo_small from '../assets/icons/toolbox-icon.svg'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { useUser } from "../state/UserContext";
import api from "../api";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import SignOutMenu from "./SignOutMenu";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import Select, { components }  from 'react-select';
import NavbarBanner from "./NavbarBanner";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useCookie from 'react-use-cookie';

export default function NavBar(props) {
  const location = useLocation();

  const [user, _setUser] = useUser();
  const [hustler, setHustler] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [cityValue, setCityValue] =  useCookie('default-city', "London, ON");
  

  let setCity = props.setCity;

  useEffect(() => {
    setCity(cityValue);
    if (user)
      setHustler(user.hustlerId);
  }, [user])

  useEffect(() => {
    if (location.pathname.split("/")[1] === "search") {
      setSearchValue(location.pathname.split("/")[2])
    }
    else {
      setSearchValue("")
    }
  }, [location])

  let history = useHistory();

  const handleClick = () => {
    if (!user) return;

    if (!user.hustlerId) {
      history.push("/home/");
      window.scrollTo(0, 0);
      return;
    }


    history.push("/profile/" + user.hustlerId._id);
    window.scrollTo(0, 0);
  };

  const handleJobsClick = () => {
    history.push("/jobs/");
    window.scrollTo(0, 0);
  };

  const handleBookingsClick = () => {
    history.push("/home/");
    window.scrollTo(0, 0);
  };

  const logout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    _setUser(null);
    history.push('/landing-page/');

  };

  const signout = () => {
    if (!user) {
      return history.push("/signup");
    }
    logout();
  }

  const onClickUsername = () => {
    if (!user) {
      return history.push("/login");
    }

    if (user.hustlerId) {
      history.push("/profile/"+user.hustlerId._id);
    }
    else if (user) {
      history.push("/home/");
    }
  }

  const menuItems = [
    {
      name: 'Search',
      link: "/search/Photography",
    },
    {
      name: 'Home',
      link: "/home/",
      hide: !user
    },
    {
      name: 'View Jobs',
      link: "/jobs/",
      hide: !user
    },
    {
      name: user ? user.firstName + " " + user.lastName : "Login",
      action: onClickUsername,
    },
    {
      name: "My Subscription",
      link: "/my-subscription/",
    },
    {
      name: user ? 'Sign Out' : "Sign up",
      action: signout
    },
  ]

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawer = (
    <div>
      <List>
        {menuItems.map((item, index) => !item.hide ? (
          <ListItem button key={item.name} component={Link} to={item.link} onClick={item.action}>
              <ListItemText primary={item.name} />
          </ListItem>
        )
        :<Box/>
        )}
      </List>
    </div>
  );


  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  function getIconStyle(page) {

    if (getPage() === page) {
      return { maxHeight: "72px", maxWidth: "80px", color: "#05C9FF" }
    }

    return { maxHeight: "72px", maxWidth: "80px", color: "#707070" }
  }

  function getTextStyle(page) {

    if (getPage() === page) {
      return { color: "#05C9FF", fontSize: 10 }
    }

    return { color: "#707070", fontSize: 10 }
  }

  function getPage(){
    return location.pathname.split("/")[1];
  }

  function getProfileStyle(page) {

    if (getPage() === page) {
      return { fontWeight: "bold", backgroundColor: "#05C9FF", paddingLeft:"10px"}
    }

    return { fontWeight: "bold", backgroundColor: "white", paddingLeft:"10px"}
  }


  const [services, setServices] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let mounted = true;

    //Gets list of cities
    api.city.getCities()
        .then(response => {
          console.log("RESPONCE AAAA", response);
          const cities = response.data;
          if (mounted) {
              setCities(cities)

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

  const ValueContainer = ({ children, ...props }) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && (
            <LocationOnIcon
              style={{ position: "absolute", left: 6, color: "#CECECE" }}
            />
          )}
          {children}
        </components.ValueContainer>
      )
    );
  };

  const DropdownIndicator = props => {
    return (
     <Box></Box>
    );
  };

  const styles = {
    valueContainer: base => ({
      ...base,
      paddingLeft: 35
    })
  };

  return [
    <AppBar elevation={3} position="sticky" style={{ backgroundColor: "white" }}>
      <Toolbar>

      <Box display={{ xs: 'none', sm: 'block' }} padding="0">
          <Link to="/" ><img src={logo} alt="HustleHub" style={{ maxHeight: "35px", paddingTop: "5px" }} /></Link>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }} padding="0">
          <Link to="/" ><img src={logo_small} alt="HustleHub" style={{ maxHeight: "35px", paddingTop: "5px" }} /></Link>
      </Box>

        {/* <div style={{ flexGrow: 0.2, }}></div> */}

      
        <Box flexGrow={1} paddingRight="10px" paddingLeft="20px" >
          <Select
            value={{label: cityValue}}
            options={cities.map((city) => { return { label: city.name, value: city._id }; })}
            onChange={opt => {
              setCityValue(opt.label);
              setCity(opt.label);
            }}
            styles={styles}
            components={{ DropdownIndicator, ValueContainer,  IndicatorSeparator: () => null }}
            placeholder="Location"
          />
          
      </Box>

        <Box flexGrow={3} paddingRight="20px" paddingLeft="0px" display={{ xs: 'none', md: 'block' }}>
          <Select
            value={{label: searchValue}}
            options={services.map((service) => { return { label: service.name, value: service._id }; })}
            onChange={opt => {
              history.push("/search/" + opt.label); 
              setSearchValue(opt.label);
            }}
            
            placeholder="I need help with..."
          />
          
      </Box>




        <Box display={{ xs: 'block', md: 'none' }}>
      
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box display={{ xs: 'none', md: 'block' }}>

          <nav>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={'right'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon />
                </IconButton>
                {drawer}
              </Drawer>
            </Hidden>

          </nav>
 
          {user ?
            <Box style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
              <Box width="20px"></Box> 
              <Box> <Box width="20px"></Box> 
               
               <Box onClick={handleBookingsClick}>
               <HomeIcon style={getIconStyle("home")}></HomeIcon>
               <Box></Box>
                 <Typography  style={getTextStyle("home")}>Home</Typography>
               </Box>

              </Box>
              {
                hustler ? <Box> <Box width="100px"></Box> 

              <Box onClick={handleJobsClick}>
               <WorkIcon style={getIconStyle("jobs")}></WorkIcon>
               <Box></Box>
                 <Typography  style={getTextStyle("jobs")}>My Jobs</Typography>
               </Box>


                </Box> : <Box width="10px"></Box>
              }


              <Chip  onClick={handleClick} avatar={<Avatar src={hustler ? hustler.profilePic : ""} />} label={user.firstName + " " + user.lastName} style={getProfileStyle("profile")} />

              <SignOutMenu></SignOutMenu>
            </Box>
            :
            <Box marginLeft="20px">
              <Link to="/signup/" style={{ textDecoration: 'none' }} >
                <Button color="primary" disableElevation >
                  <b>Sign Up</b>
                </Button>
              </Link>
              <Link to="/login/" style={{ textDecoration: 'none', marginLeft:"20px"}} >
                <Button variant="outlined" color="primary" style={{background: "#E1F9FF",}} >
                  <b>Sign In</b>
                </Button>
              </Link>
            </Box>
          }
        </Box>
      </Toolbar>
      <Box display={{ xs: 'block', md: 'none' }}>
      <Toolbar>
      <Box flexGrow={1} >
      {/* <Select
            value={{label: cityValue}}
            options={cities.map((city) => { return { label: city.name, value: city._id }; })}
            onChange={opt => {
              setCityValue(opt.label);
              setCity(opt.label);
            }}
            styles={styles}
            components={{ DropdownIndicator, ValueContainer,  IndicatorSeparator: () => null }}
            placeholder="Location"
          /> */}

          <Select
            value={{label: searchValue}}
            options={services.map((service) => { return { label: service.name, value: service._id }; })}
            onChange={opt => {
              history.push("/search/" + opt.label); 
              setSearchValue(opt.label);
            }}
            
            placeholder="I need help with..."
          />
          </Box>
          
      </Toolbar>
      </Box>
      
      {/* <NavbarBanner></NavbarBanner> */}
    </AppBar>

  ];
}