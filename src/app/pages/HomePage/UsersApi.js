import React from "react";
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import randomColor from "../../utils/randomColor";

class UsersApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 15,
            page: 0,
            userData: [],
            pageData: {}
        };
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getUsers(this.state.page)
    }

    getUsers = (page) => {
        let token = localStorage.getItem('token');
        axios.get(`https://api.prontoitlabs.com/api/v1/user?page=${page}&size=${this.state.offset}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': token
            }
        })
            .then(resp => {
                if (resp.data.status === true) {
                    this.setState({
                        userData: [...resp.data.data.content],
                        pageData: {
                            currentPage: resp.data.data.currentPage,
                            currentPageSize: resp.data.data.currentPageSize,
                            totalElements: resp.data.data.totalElements,
                            totalPages: resp.data.data.totalPages,
                        }
                    });
                } else {
                    toast.error('Forbidden!');
                }
            }).catch(er => {
            console.log('error:', er);
        })
    };
    next = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.getUsers(this.state.page)
        });

    };
    previous = () => {
        let prev = this.state.page === 0 ? 0 : this.state.page - 1;
        this.setState({
            page: prev
        }, () => {
            this.getUsers(this.state.page)
        });

    };


    render() {
        return (
            <div className={'container'}>
                <div className="row pt-4">
                    <div className="col">
                        <div className="jumbotron">
                            <div className="header">
                                {this.state.userData.length > 0 &&
                                <div>
                                    <h3 className={'mb-4'}>You are on page : {this.state.pageData.currentPage + 1}</h3>
                                    <p><span>Total Users: {this.state.pageData.totalElements}</span>, Total
                                        Pages left:<span>{this.state.pageData.totalPages - (this.state.page +1)}</span>
                                    </p>
                                </div>

                                }
                            </div>
                            <div className="table">
                                {this.state.userData.map((u, i) => (
                                    <div className="user" key={u.id}>
                                        <div className="user-img" style={{backgroundColor: randomColor()}}>

                                        </div>
                                        <div className="user-body">
                                            <span className={'user-Name'}>User Name: {u.userName}</span>
                                            <b>Gender: {u.gender}</b>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <nav aria-label="Page navigation pag">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button disabled={this.state.page === 0 ? true : false}
                                            className={`page-link ${this.state.page === 0 ? 'disabled' : null}`}
                                            onClick={(e) => this.previous(e)} aria-label="Previous">
                                        <span aria-hidden="true">Previous</span>
                                    </button>
                                </li>
                                <li className="page-item">
            <button disabled={this.state.pageData.totalPages - (this.state.page+1) ===0 ? true:false} onClick={(e) => this.next(e)} className={`page-link ${this.state.pageData.totalPages - (this.state.page+1) === 0 ?'disabled':''}`} aria-label="Next">
            <span aria-hidden="true">Next</span>
            </button>

            </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(UsersApi);