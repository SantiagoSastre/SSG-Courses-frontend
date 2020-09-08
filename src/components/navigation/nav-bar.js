import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class nav_bar extends Component{
    render() {
        return (
            <div>
                { this.props.registered === true ?
                <div className="nav-bar">
                    <NavLink exact to="/" activeClassName="active-link">HOME</NavLink>
                    <NavLink to="/courses" activeClassName="active-link">COURSES</NavLink>
                    <NavLink to="/profile" activeClassName="active-link">{this.props.name !== ""? this.props.name.toUpperCase():"PROFILE"}</NavLink>
                </div>
    :
    null
    }
            </div>
        )
    }
}

