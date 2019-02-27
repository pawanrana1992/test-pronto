import React from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import CheckAuth from "../../component/shared/CheckAuth";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            gender: '',
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
                gender: this.state.gender
            });
            axios.post('https://api.prontoitlabs.com/api/v1/user', user,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => {
                    if(resp.data.status === true){
                        toast('Register successful!');
                        this.props.history.push('/login')
                    }else{
                        toast.error('Forbidden!');
                    }
                }).catch(er => {
                    if(!er.response){
                        toast.error('Network error!')
                    }
                    else if(er.response.data && !er.response.data.status && er.response.data.errorMessage){
                        toast.error(er.response.data.errorMessage)
                    }else{
                        toast.error('Registration Failed!')
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
                <div className={'container'}>
                    <div className="row align-items-center" style={{height: '100vh'}}>
                        <div className="col">
                            <div className="jumbotron" style={{maxWidth: '500px', margin: 'auto'}}>
                                <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                                    <h3 className={'mb-4'}>Register</h3>
                                    <div className="form-group">
                                        <input name={'userName'} required={true} type="text"
                                               className={`form-control ${!this.state.emailError ? null : 'is-invalid'}`}
                                               onChange={this.handleInput} placeholder={'User name'} defaultValue={''}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" required={true} onChange={this.handleInput} name={'password'}
                                               className={'form-control'} placeholder={'password'} defaultValue={''}/>
                                    </div>
                                    <div className="form-group">
                                        <select name="gender" className={'form-control'} onChange={this.handleInput}>
                                            <option value="" selected={true} disabled={true}>select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <button type={'submit'} className={'btn btn-primary'}>Register</button>
                                    </div>
                                    <div className="form-group">
                                        Already have account ? <Link to={'/login'}>Login Now</Link>
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


export default RegisterPage;