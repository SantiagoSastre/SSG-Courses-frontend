import React, { Component } from "react";
import { NavLink,Link } from "react-router-dom"; 
import axios from "axios";
import ReactPlayer from "react-player";

export default class CourseContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            course: [],
            section: 1,
            guide:1,
            title: "",
            content: "",
            video: "",
            adminId:""
        }
        this.plus = this.plus.bind(this);
        this.less = this.less.bind(this);

    }
    plus=()=> {
        this.state.course.map((s)=>{
             if (s.section == this.state.section) {
                 if(s.content[this.state.guide] != undefined) {
            this.setState({
                guide: this.state.guide +1,
                title:s.content[this.state.guide].guideName,
                content:s.content[this.state.guide].guideContent,
                video:s.content[this.state.guide].video
            })
        } else {
            this.state.course.map((s2)=>{
                if (s2.section == this.state.section +1) {
                        this.setState({
                            guide: 1,
                            title:s2.content[0].guideName,
                            content:s2.content[0].guideContent,
                            video:s2.content[0].video,
                            section: this.state.section +1
                        })
                    } else {
                        this.setState({
                            guide: 1,
                            title:"You finished this course",
                            content:"Congratulations!!",
                            video:"",
                            section: this.state.section +1
                        })
                    
                } 
            })
        }
        }
        })
    }
    less=()=> {
        if (this.state.guide == 1) {
            if(this.state.section == 1){
                null
            } else {
                this.state.course.map((s)=>{

                    s.section == this.state.section -1?
                    this.setState({
                        guide: s.content.length,
                        title:s.content[s.content.length-1].guideName,
                        content:s.content[s.content.length-1].guideContent,
                        video:s.content[s.content.length-1].video
                    })
                    :null
                })
                this.setState({section:this.state.section -1})
            }
        }else{
            this.state.course.map((s) => {
                s.section == this.state.section?this.setState({
                    content:s.content[this.state.guide -2].guideContent,
                    title:s.content[this.state.guide -2].guideName,
                    video:s.content[this.state.guide -2].video,
                    guide: this.state.guide -1
                }):null
            })
        }
    }
    componentDidMount(){
        axios.get(`https://santisastre.a2hosted.com/flaskapp/course/id/${Number(this.props.match.params.id)}`)
        .then((res)=>{
            this.setState({course:res.data.content,adminId:res.data.adminId});
            res.data.content.map((s) =>{
                s.section == this.state.section?this.setState({
                    content:s.content[this.state.guide -1].guideContent,
                    title:s.content[this.state.guide -1].guideName,
                    video:s.content[this.state.guide -1].video
                }):null
            })
        }).catch(function (error) {
            alert("we couldn't fetch the course data, try again later by reloading the page")
        })
    }



      render() {
        return (
            <div>
                {this.props.registered === true?
                <div>
                <p>section {this.state.section} guide {this.state.guide}</p>

                <div className="guide-wrapper">
                    
                    <div className="guide">
                    <div className="next_wrapper">
                    <button className="next" onClick={this.less}>{"<"}</button>
                    </div>
                        <div className="shadow">
                            <div className="content">
                            <div className="title">
                    <h1>{this.state.title}</h1>
                    </div>
                    <div className="video_wrapper">{this.state.video !== ""?<ReactPlayer
      url={this.state.video}
       controls={true}
       width="90%"
                    />:""}</div>
                    <div>
            <p>{this.state.content}</p>
            </div>
            <div className="upd_wrapper">
            {this.state.adminId== this.props._id?(this.state.title == "You finished this course"?"":<Link to={{pathname: `/update/c/${this.props.match.params.id}`,state: { course:this.state.course,section: this.state.section,guide:this.state.guide}
  }} className="semilink">Update Guide</Link>):""}
            </div>
            </div>
                </div>
                <div className="next_wrapper">


                
                <button className="next" onClick={this.plus}>{">"}</button>
                </div>
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

