import React from "react";
import 'react-calendar/dist/Calendar.css';
import api from "../../api";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function AliasProfile() {

    const [hustler, setHustler] = useState()
    let { alias } = useParams();
    const history = useHistory();
    
    useEffect(() => {
        api.alias.getHustlerFromAlias(alias)
            .then(response => {
                if (response.data.hustler == null) {
                    history.push("/");
                }
                else{
                setHustler(response.data.hustler);
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
    }, [alias]);

    return hustler ? <ProfilePage hustler={hustler}/> : <Box/>
}
