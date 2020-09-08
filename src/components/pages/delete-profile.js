import React, { Component } from "react";
import { NavLink } from "react-router-dom"; 
import axios from "axios";
import Cookies from "js-cookie";

export default class DeleteProfile extends Component{
    constructor(props) {
        super(props)
        this.delUser = this.delUser.bind(this)

    }
    delUser = () =>{
        axios({
            method: 'delete',
            url: `https://santisastre.a2hosted.com/flaskapp/user/delete/${this.props._id}`})
            .then(()=>{
                Cookies.remove('user');
                this.props.callbackFromParents(undefined);
            })
            .catch((er)=>{
                alert("there was an error, try again later");
                console.log(er)
            })

    }
    render() {
        return (
            <div className="Courses">
                {this.props.registered === true?
                <div>
                    <h1>are you sure you want to delete your profile?</h1>
                    <button className="riskdel" onClick={this.delUser}>Confirm</button>
                    <div>
                    <NavLink exact to="/proflie">Cancel</NavLink>
                    </div>
                </div>
                :
                <div>
                <h1>Welcome to SSG courses app, to start using please login.</h1>
                <NavLink exact to="/login">Login</NavLink>
                </div>
                }
            </div>
        )
    }
}

