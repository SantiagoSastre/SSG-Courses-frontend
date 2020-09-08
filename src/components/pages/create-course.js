import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

class CreateCourse extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            Javascript: 0,
            Python: 0,
            SQLDB: 0,
            CSS: 0,
            React: 0,
            Flask: 0,
            image: ""
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
        if (this.state.name !== "" ) {
        axios({
            method: 'post',
            url: 'https://santisastre.a2hosted.com/flaskapp/course/create',
            data: {
              name: this.state.name,
              description: this.state.description,
              adminId:this.props._id,
              content: [],
              tags:{
                Javascript:this.state.Javascript,
                Python:this.state.Python,
                SQLDB:this.state.SQLDB,
                CSS:this.state.CSS,
                React:this.state.React,
                Flask:this.state.Flask},
              image: this.state.image
            
            }
          }).then((response)=>{
            this.props.history.push(`/course/add/${response.data.id}`)
          }).catch(()=>{
              alert("there was an error, perhaps you used a already used name, if this appears multiple times try later")
          })
        } else {
            alert("the name is empty")
        }
        }
    render() {
        return (
            <div className="courses">
                {this.props.registered === true?
                <div>
                    
                    
                    <form onSubmit={this.handleSubmit} className="Register">
                    <h1>Create course</h1>
                <div>
                    <input             
            name="name"
            type="text"
            onChange={this.handleChange}
            placeholder="name"/>
            </div>
            <div>
                    <textarea             
            name="description"
            type="text"
            onChange={this.handleChange}
            placeholder="description"/>
            </div>
            <div>
                    <input             
            name="image"
            type="text"
            onChange={this.handleChange}
            placeholder="image URL"/>
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


            <button type="submit" className="coursesub">Submit</button>
            <NavLink exact to="/courses">Cancel</NavLink>
                </form>
                
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

export default withRouter(CreateCourse)