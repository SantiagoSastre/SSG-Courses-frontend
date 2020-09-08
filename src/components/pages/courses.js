import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class Courses extends Component{
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            search: "",
            searchMode: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    
    }
    componentDidMount() {
        axios.get(`https://santisastre.a2hosted.com/flaskapp/courses`).then((res)=> {
            this.setState({
                courses: res.data
            })
        }).catch(()=>{
            alert("couldn't fetch courses, try again later")
        })
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
        axios.get(`https://santisastre.a2hosted.com/flaskapp/courses/${this.state.search}`).then((res)=> {
            this.setState({
                courses: res.data,
                searchMode:true
            })
        }).catch(()=>{
            alert("couldn't fetch courses, try again later")
        })
      }
    render() {
        return (
            <div className="Courses">
                {this.props.registered === true?
                <div className="cWrapper">
                    <form className="search-wrap" onSubmit={this.handleSubmit}>
                    <input placeholder="search" name="search" className="search" type="text" onChange={this.handleChange}></input><button type="submit" className="sb">Go</button>
                    </form>
                    <div>
                    <NavLink exact to="/course/create" className="addC">
                <div className="addCwrapper">
                +
                </div>
              </NavLink>
            
      <div className="courselist">
      {this.state.searchMode === true? "Search results:":"courses:"}
      {this.state.courses.map((object, i) =><div className="course-wrapper"key={i}><img src={object.image === ""?"https://cdn4.iconfinder.com/data/icons/jetflat-2-multimedia-vol-2/60/004_100_code_tag_brackets_coding_html_development-512.png":object.image}></img>   <div className="container">
  <NavLink className="textlink" to={`/course/${object.id}`}>{object.name.toUpperCase()}</NavLink>
    <h4>Tags: {
    Object.keys(object.tags).filter((key) =>{return object.tags[key]}).map((tag)=>{
        return `${tag} `
    })}</h4>
  <p>{object.description}</p>
  </div></div> )}
  </div>
  </div>

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

