import axios from "axios";
import {BrowserRouter} from 'react-router-dom';



const CheckAuth = {
    isAuthenticated: false,
    authenticate(callback) {
        let userToken = localStorage.getItem('token');
        if(userToken){
            axios.post('https://api.prontoitlabs.com/api/v1/user/verify-token',{},{
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN':userToken
                }
            })
                .then(resp => {
                    if(resp.data.status === true){
                        this.isAuthenticated = true;
                        callback(true)
                    }else{
                        this.isAuthenticated = false;
                        callback(false)
                    }
                }).catch(er => {
                this.isAuthenticated = false;
                callback(false);
            });
        }else{
            this.isAuthenticated = false;
            callback(false);
        }


    },
    logout(callback) {
        this.isAuthenticated = false;
        localStorage.clear();
        callback(true)
    }
};


export default CheckAuth;