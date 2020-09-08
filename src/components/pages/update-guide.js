import React, { Component } from "react";
import { NavLink, match } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";


class UpdateGuide extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            content: "",  
            video: ""
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if(this.props.location.state == undefined){
            this.props.history.push("/");
        }
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
        if (this.state.name !== "" ) {
            event.preventDefault();
            var course = this.props.location.state.course;
            var guide =  course[this.props.location.state.section -1]["content"][this.props.location.state.guide-1];
            guide['guideContent'] = this.state.content;
            guide['guideName'] = this.state.name;
            guide['video'] = this.state.video;
            course[this.props.location.state.section -1]["content"][this.props.location.state.guide-1] = guide

            axios({
                method: 'put',
                url: `https://santisastre.a2hosted.com/flaskapp/course/add-content/${Number(this.props.match.params.id)}`,
                data: {
                content: course
                }
                
                }).then(()=> {
                    this.props.history.push(`/course/${Number(this.props.match.params.id)}`);
                }).catch(()=>{
                    alert("ther was an error, please check if you used hashes or quotes, if not try again later");
                })
            }
      }

    render() {
        return (
            <div className="courses">
                {this.props.registered === true?
                <div>
                    
                    
                    <form onSubmit={this.handleSubmit} className="Register">
                    <h1>Update guide</h1>
                <h2>{this.state.courseName}</h2>
                <p>quotation marks and hashes aren't allowed</p>
                <div>
                    <input             
            name="name"
            type="text"
            onChange={this.handleChange}
            placeholder="name"/>
            </div>
            <div>
            <input             
            name="video"
            type="text"
            onChange={this.handleChange}
            placeholder="URL for video"/>
            </div>
            <div>
                
                    <textarea             
            name="content"
            type="text"
            onChange={this.handleChange}
            placeholder="content"/>
            </div>
            <button type="submit" className="coursesub">Submit</button>
            <NavLink  to={"../../course/"+(this.props.match.params.id)}>Go back to course</NavLink>
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

export default withRouter(UpdateGuide);