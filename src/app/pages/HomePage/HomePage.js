import React from "react";
import CheckAuth from "../../component/shared/CheckAuth";
import {withRouter} from "react-router-dom";
import UsersApi from "./UsersApi";
import './home.scss'
class HomePage extends React.Component{
    logout = (e)=>{
        e.preventDefault();
        CheckAuth.logout((e)=>{
            if(e === true)
            this.props.history.push('/login')
        })
    };
    render() {
        return (
            <div className={'home-page'}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0 ml-auto">
                                <button onClick={(e)=>this.logout(e)} className="btn btn-outline-success my-2 my-sm-0" type="submit">LogOut</button>
                        </form>
                    </div>
                </nav>
                <UsersApi/>
            </div>
        );
    }
}

export default withRouter(HomePage);