import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import ProtectedRoute from "./app/component/shared/ProtectedRoute";
import LoginPage from "./app/pages/LoginPage/LoginPage";
import RegisterPage from "./app/pages/RegisterPage/RegisterPage";
import HomePage from "./app/pages/HomePage/HomePage";
import { ToastContainer} from 'react-toastify';
import CheckAuth from "./app/component/shared/CheckAuth";
class App extends Component {
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
            <Switch>
                <ProtectedRoute exact path='/' component={HomePage} />
                <Route exact path={'/login'} component={LoginPage}/>
                <Route exact path={'/register'} component={RegisterPage}/>
                <Route render={()=><h3>Error 404</h3>}/>
            </Switch>
            </React.Fragment>
        );
    }
}


export default App;
