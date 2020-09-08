import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"; 

export default class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            recomended: []
        }

    
    }
    componentDidMount() {
        if (this.props._id != undefined) {
        axios.get(`https://santisastre.a2hosted.com/flaskapp/user/id/${this.props._id}`).then((resp)=>{
            axios.get(`https://santisastre.a2hosted.com/flaskapp/courses`).then((res)=> {
            res.data.map((c)=>{
                if(resp.data.coursesTakingId == null){
                    Object.keys(resp.data.tags).filter((key) =>{return resp.data.tags[key]}).map((tag)=>{
                        Object.keys(c.tags).filter((key) =>{return c.tags[key]}).map((ctag)=>{
                            if(ctag == tag){
                                this.setState({recomended: this.state.recomended.concat(c)})
                            }
                            
                        })
                    })
                }
                
                 else if(resp.data.coursesTakingId.includes(c.id)  === true){
                    this.setState({courses:this.state.courses.concat([c])})
                } else {
                    Object.keys(resp.data.tags).filter((key) =>{return resp.data.tags[key]}).map((tag)=>{

                        Object.keys(c.tags).filter((key) =>{return c.tags[key]}).map((ctag)=>{

                            if(ctag == tag){
                                this.setState({recomended: this.state.recomended.concat(c)})
                            }
                        })
                    })
                }
                
            })
        }).catch(()=>{
            alert("couldn't fetch courses, try again later")
        })
        }).catch(()=>{
            alert("couldn't fetch courses, try again later")
        })
    }
    }
    render() {
        return (
            <div className="home">
                {this.props.registered === false? 
                <div>
                <h1>Welcome to SSG courses app, to start using please login.</h1>
                <NavLink exact to="/login">Login</NavLink>
                </div>
                :
                <div>      
                    <div className="courselist">
                    Courses you are taking
                {this.state.courses.map((object, i) =><div className="course-wrapper"key={i}><img src={object.image === ""?"https://cdn4.iconfinder.com/data/icons/jetflat-2-multimedia-vol-2/60/004_100_code_tag_brackets_coding_html_development-512.png":object.image}></img>   <div className="container">
            <NavLink className="textlink" to={`/course/${object.id}`}>{object.name.toUpperCase()}</NavLink>
              <h4>Tags: {
              Object.keys(object.tags).filter((key) =>{return object.tags[key]}).map((tag)=>{
                  return `${tag} `
              })}</h4>
            <p>{object.description}</p>
            </div></div> )}
            </div>
            <div className="courselist">
                    reccomended courses
                {this.state.recomended.map((object, i) =><div className="course-wrapper"key={i}><img src={object.image === ""?"https://cdn4.iconfinder.com/data/icons/jetflat-2-multimedia-vol-2/60/004_100_code_tag_brackets_coding_html_development-512.png":object.image}></img>   <div className="container">
            <NavLink className="textlink" to={`/course/${object.id}`}>{object.name.toUpperCase()}</NavLink>
              <h4>Tags: {
              Object.keys(object.tags).filter((key) =>{return object.tags[key]}).map((tag)=>{
                  return `${tag} `
              })}</h4>
            <p>{object.description}</p>
            </div></div> )}
            </div>

            </div>
                }   
            </div>
        )
    }
}

