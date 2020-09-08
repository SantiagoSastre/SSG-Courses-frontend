import React, { Component } from "react";
import { NavLink } from "react-router-dom"; 
import axios from "axios";

export default class UpdateProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
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
        handleSubmit(event) {
          event.preventDefault();
          axios({
              method: 'put',
              url: `https://santisastre.a2hosted.com/flaskapp/user/update/${this.props.userId}`,
              data: {
                name: this.state.username,
                description: this.state.description,
                tags:{
                  Javascript:this.state.Javascript,
                  Python:this.state.Python,
                  SQLDB:this.state.SQLDB,
                  CSS:this.state.CSS,
                  React:this.state.React,
                  Flask:this.state.Flask}
                }
            }).then( () =>{
              axios.get(`https://santisastre.a2hosted.com/flaskapp/user/id/${this.props.userId}`)
        .then( (response)=> {
          this.props.callbackFromParents(response.data)
        })
        .catch(function (error) {
          console.log(error);
          alert("we couldn't fetch your user, unless yo deleted it in another device try again later by reloading the page")
        })
              this.props.history.push("/");
            }).catch(function () {
                alert("there was an error logging you into your account,perhaps your new name is already used")
              }
            )}
            
      render() {

        return (
            <div className="profile-updating">
                {this.props.registered === true?
                <div>
                    <div className="updt">
                    <h3>Profile Data</h3>
                    <form onSubmit={this.handleSubmit}>
                <input             
            name="username"
            type="text"
            onChange={this.handleChange}
            placeholder="name"/>
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
                <NavLink exact to="/profile">return</NavLink>
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