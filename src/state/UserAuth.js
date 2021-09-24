import {useEffect } from 'react';
import { useUser} from "../state/UserContext";
import api from "../api";

export default function UserAuth(props) {

    const [, setUser] = useUser();
  
      useEffect(() => {
        api.auth.me()
            .then(response => {
                //populates hustlerId
                let _hustler = response.data.hustler;
                response.data.user.hustlerId = _hustler;
                setUser(response.data.user);
            })
            .catch(error => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.data) {
                        console.error(error.response.data.message);
                
                    }
                }
            })
    }, [setUser])
    
    return <div>{props.children}</div>;
}