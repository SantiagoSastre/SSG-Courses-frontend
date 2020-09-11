import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

 class Register extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            description: "",
            Javascript: 0,
            Python: 0,
            SQLDB: 0,
            CSS: 0,
            React: 0,
            Flask: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeJS = () => {
      this.setState({
        Javascript: (this.state.Javascript == 0?1:0),
      });
    }
  
    onChangePython = () => {
      this.setState({
        Python: (this.state.Python == 0?1:0),
      });
    }
  
    onChangeSQLDB = () => {
      this.setState({
        SQLDB: (this.state.SQLDB == 0?1:0),
      });
    }
  
    onChangeCSS = () => {
      this.setState({
        CSS: (this.state.CSS == 0?1:0),
      });
    }
  
    onChangeReact = () => {
      this.setState({
        React: (this.state.React == 0?1:0),
      });
    }
    onChangeFlask = () => {
      this.setState({
        Flask: (this.state.Flask == 0?1:0),
      });
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit= (event)=> {
        event.preventDefault();
        if (this.state.username !== "" && this.state.password !== "") {
        axios({
            method: 'post',
            url: 'https://santisastre.a2hosted.com/flaskapp/register/',
            data: {
              name: this.state.username,
              password: this.state.password,
              description: this.state.description,
              tags:{
                Javascript:this.state.Javascript,
                Python:this.state.Python,
                SQLDB:this.state.SQLDB,
                CSS:this.state.CSS,
                React:this.state.React,
                Flask:this.state.Flask}
            
            }
          })
          .then( (response)=>{
          var regStatus = response.data.message
          regStatus === "user created"? 
          axios({
            method: 'post',
            url: 'https://santisastre.a2hosted.com/flaskapp/login/',
            data: {
              name: this.state.username,
              password: this.state.password
            }
          }).then( (resp) => {
            Cookies.set('user', resp.data.userId, { expires: 90 });
            axios.get(`https://santisastre.a2hosted.com/flaskapp/user/id/${resp.data.userId}/`)
      .then( (response)=> {
        this.props.callbackFromParents(response.data)
      })
      .catch(function (error) {
        console.log(error);
        alert("we couldn't fetch your user, unless yo deleted it in another device try again later by reloading the page")
      })
            this.props.history.push("/profile");
          })
          : 
          alert("There was an error handling your registry, its possible that you choose an already used name, if this message apears often it can mean too that the server is down")
          })
        } else {
          alert("the name or password field is empty")
        }
        }
    render() {
        return (
          <div>
          {this.props.registered === false?
            <div className="Register">
              

                <h1>Register</h1>

              
                <form onSubmit={this.handleSubmit}>
                <div>
                    <input             
            name="username"
            type="text"
            onChange={this.handleChange}
            placeholder="name"/>
            </div>
            <div>
                    <input             
            name="password"
            type="password"
            onChange={this.handleChange}
            placeholder="password"/>
            </div>
            <div>
                    <textarea             
            name="description"
            type="text"
            onChange={this.handleChange}
            placeholder="description"/>
            </div>
            <h3 className="tagsh3">Tags</h3>
            <div className="checklist-form">
            <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.Javascript}
                onChange={this.onChangeJS}
                className="form-check-input"
              />
              Javascript
            </label>
          </div>
        
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.React}
                onChange={this.onChangeReact}
                className="form-check-input"
              />
              ReactJS
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.Python}
                onChange={this.onChangePython}
                className="form-check-input"
              />
              Python
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.Flask}
                onChange={this.onChangeFlask}
                className="form-check-input"
              />
              Flask
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.SQLDB}
                onChange={this.onChangeSQLDB}
                className="form-check-input"
              />
              SQL DB
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.CSS}
                onChange={this.onChangeCSS}
                className="form-check-input"
              />
               CSS
            </label>
          </div>
        </div>


            <button type="submit">Submit</button>

                </form>
                <div>
                <NavLink exact to="/login">Or login</NavLink>
                </div> 
            </div>
            :
            this.props.history.push("/")
          }
          </div>
        )
    }
}
export default withRouter(Register);