import React, { Component } from "react";
import { NavLink } from "react-router-dom"; 
import Cookies from "js-cookie";

export default class profile extends Component{
    constructor(props) {
        super(props);



        this.logout = this.logout.bind(this)

    }
    logout() {
        Cookies.remove('user');
        this.props.callbackFromParents(undefined)
    }


      render() {
        const tags = Object.keys(this.props.userData.tags).filter((key) =>{return this.props.userData.tags[key]});
        return (
            <div className="profile">
                {this.props.registered === true?
                <div>
                    <div className="data">
                    <h3>Profile Data</h3>
                <p>Username:  {this.props.userData.username}</p>
                <p>Description:  {this.props.userData.description}</p>
                <p>Tags: {tags.map((tag)=>{
                        return `${tag} `
                    })}</p>
                    </div>
                    <NavLink exact to="/update-profile" className="semilink">Update Profile</NavLink>
                    <button className="riskbutton" onClick={this.logout}>Log out</button>
                    <NavLink exact to="/delete/user" className="semitype2">Delete account</NavLink>
                    
                </div>
            :
            <div>
            <h1>Welcome to SSG courses app, to start using please login.</h1>
            <NavLink exact to="/login" >Login</NavLink>
            </div>
            }
            </div>
        )
    }
}

