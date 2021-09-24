import React from "react";
import Button from '@material-ui/core/Button';
import loading from '../assets/loading.gif'


export default function LoadingButton() {


    return [
        <div>
           
            <Button >
            <img src={loading} alt="Loading" style={{maxHeight:"20px",}}/>
            &nbsp;
            Loading
            </Button>

        </div>
    ];
}