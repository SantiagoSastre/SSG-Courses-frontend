import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
import Cookies from "js-cookie"
import { withRouter } from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
      handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://santisastre.a2hosted.com/flaskapp/login',
            data: {
              name: this.state.username,
              password: this.state.password
            }
          }).then( (resp) =>{
            Cookies.set('user', resp.data.userId, { expires: 90 });
            axios.get(`https://santisastre.a2hosted.com/flaskapp/user/id/${resp.data.userId}`)
      .then( (response)=> {
        this.props.callbackFromParents(response.data)
      })
      .catch(function (error) {
        console.log(error);
        alert("we couldn't fetch your user, unless yo deleted it in another device try again later by reloading the page")
      })
            this.props.history.push("/profile");
          }).catch(function () {
              alert("there was an error logging you into your account")
            }
          )}
    
    render() {
        return (
            <div className="Login">
              {this.props.registered === false?
              <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                <input             
            name="username"
            type="text"
            onChange={this.handleChange}
            placeholder="name"/>
                    <input             
            name="password"
            type="password"
            onChange={this.handleChange}
            placeholder="password"/>
            <button type="submit">Submit</button>
                </form>
                <NavLink exact to="/register">Or create an account</NavLink>
                </div>
                : this.props.history.push("/")}
            </div>
        )
    }
}
export default withRouter(Login);