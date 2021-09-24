import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import api from "../api";
import { useUser } from "../state/UserContext";

export default function SignOutMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let history = useHistory();

  let [user, _setUser] = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    history.push('/landing-page/');
    _setUser(null);
  };

  const subscription = () => {
    handleClose();

    history.push('/my-subscription/');
   // window.location.reload();
  };

  // const deleteAccount = async () => {
  //   handleClose();

  //   try {
  //     console.error(user);
  //     console.error("oink oink");
  //     await api.user.deleteUserById(user[0]._id);

  //     history.push('/landing-page/');
  //     window.location.reload();
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>

      <MoreVertIcon onClick={handleClick}></MoreVertIcon>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={subscription}>My Subscription</MenuItem>
        {/* <MenuItem onClick={deleteAccount}>Delete Account</MenuItem> */}

      </Menu>
    </div>
  );
}
