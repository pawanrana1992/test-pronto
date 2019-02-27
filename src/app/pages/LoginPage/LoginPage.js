import React from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import CheckAuth from "../../component/shared/CheckAuth";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            redirectTo: false
        };
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })

    };
    componentDidMount(){
        CheckAuth.authenticate((e) => {
            this.setState({
                redirectTo:e,
            })
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        let {userName, password} = this.state;
        if (!userName && !password) {
            toast.error('Please fill all form data!');
        } else {
            let user =JSON.stringify( {
                userName: this.state.userName,
                password: this.state.password,
            });
            axios.post('https://api.prontoitlabs.com/api/v1/user/login', user,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => {
                    if(resp.data.status === true){
                        toast('Logged successful!');
                        localStorage.setItem('token',resp.data.data.token);
                        this.setState({ redirectTo: true });
                    }else{
                        this.setState({ redirectTo: false });
                        toast.error('Forbidden!');
                    }
                }).catch(er => {
                    if(!er.response){
                        toast.error('Network error!')
                    }
                else if(er.response.data && !er.response.data.status && er.response.data.errorMessage){
                    this.setState({ redirectTo: false });
                    toast.error(er.response.data.errorMessage)
                }else{
                    this.setState({ redirectTo: false });
                    toast.error('Logged In Failed!')
                }

            })
        }
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectTo } = this.state;

        if (redirectTo) {
            return <Redirect to={from} />;
        }else{
            return(
                <div className="container">
                    <div className="row align-items-center" style={{height:'100vh'}}>
                        <div className="col">
                            <div className="jumbotron" style={{maxWidth: '500px', margin:'auto'}}>
                                <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                                    <h3 className={'mb-4'}>Login</h3>
                                    <div className="form-group">
                                        <input name={'userName'} type="text" onChange={this.handleInput} className={'form-control'} placeholder={'User name'} defaultValue={''}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name={'password'} onChange={this.handleInput} className={'form-control'} placeholder={'password'} defaultValue={''}/>
                                    </div>
                                    <div className="form-group">
                                        <button  type={'submit'} className={'btn btn-primary'}>Login</button>
                                    </div>
                                    <div className="form-group">
                                        Don't have account ? <Link to={'/register'}>Register Now</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


    }
}

export default LoginPage;
