import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


export default class CoursePage extends Component{
    constructor(props) {
        super(props)
        this.state ={
            courseName: "",
            tags: [],
            description:"",
            adminId: null,
            adminName: ""
        
        }
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit=()=>{
        axios({
            method: 'put',
            url: `https://santisastre.a2hosted.com/flaskapp/user/${this.props._id}/take/course/${this.props.match.params.id}`       
            }).then((response)=> {
                this.props.callbackFromParents(response.data)
                this.props.history.push(`/take/${Number(this.props.match.params.id)}`);
            }).catch(()=>{
                alert("ther was an error, try again later");
            })
    }
        componentDidMount() {
        axios.get(`https://santisastre.a2hosted.com/flaskapp/course/id/${Number(this.props.match.params.id)}`)
        .then( (response)=> {
            const keys = Object.keys(response.data.tags);
            const formatTags = keys.filter((key) =>{return response.data.tags[key]})
            this.setState({
            courseName: response.data.name,
            tags: formatTags,
            description: response.data.description,
            adminId: response.data.adminId
            })
            axios.get(`https://santisastre.a2hosted.com/flaskapp/user/id/${Number(response.data.adminId)}`).then((res)=>{
                this.setState({adminName:res.data.name})
            })
        })
        .catch(function (error) {
            console.log(error);
            alert("we couldn't fetch the course data, try again later by reloading the page")
        })
    }


      render() {
        const taking = this.props.coursesTaking
        return (
            <div>
                {this.props.registered === true?
                <div className="coursepage">
                    <h1>{this.state.courseName.toUpperCase()}</h1>
                <h4>author: {this.state.adminName}</h4>
                    <p>tags: {this.state.tags.map((tag)=>{
                        return `${tag} `
                    })}</p>
                    <p>description: {this.state.description}</p>
                    {this.state.adminId==this.props._id?<NavLink exact to={`/course/add/${this.props.match.params.id}`} className="semilink">Add content</NavLink>:""}
                    {taking == null?<button className="take" onClick={this.handleSubmit}>Take</button>:(taking.includes(Number(this.props.match.params.id)) == true?<NavLink className="semi2" to={`/take/${this.props.match.params.id}`} >Go</NavLink>:<button className="take" onClick={this.handleSubmit}>Take</button>)}
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

