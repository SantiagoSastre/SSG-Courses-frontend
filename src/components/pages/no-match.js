import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NoMatch extends Component{
    render() {
        return (
            <div className="no-match">
                <h2>The page wasn't found.</h2>
                <NavLink exact to="/">Home</NavLink>
            </div>
        )
    }
}

