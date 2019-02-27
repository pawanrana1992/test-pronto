import {Redirect, Route} from "react-router-dom";
import React from 'react';
import CheckAuth from "./CheckAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => (
        CheckAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
};

export default ProtectedRoute;
