import React, { Component } from "react";
import { NavLink, match } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";


class AddContent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            content: "",
            courseName:"",
            actualContent: [],
            section:'NEW',
            video: ""
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`https://santisastre.a2hosted.com/flaskapp/course/id/${Number(this.props.match.params.id)}`)
        .then( (response)=> {
            this.setState({
            courseName: response.data.name,
            actualContent: response.data.content
            });
            if(this.props._id != response.data.adminId) {
                this.props.history.push("/");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("we couldn't fetch the course data, try again later by reloading the page")
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
    
      handleSubmit= (event)=> {
        if (this.state.name !== "" ) {
            event.preventDefault();
            const contentFI = this.state.actualContent;
            if(this.state.section === "NEW") {
                
                contentFI.push({"section":this.state.actualContent.length +1,"content":[{"guideName":this.state.name,"video":this.state.video,"guideContent":this.state.content}]})
            } else {
            
                const place = this.state.section -1;
                contentFI[place]["content"].push({"guideName":this.state.name,"video":this.state.video,"guideContent":this.state.content})
            }

            axios({
                method: 'put',
                url: `https://santisastre.a2hosted.com/flaskapp/course/add-content/${Number(this.props.match.params.id)}`,
                data: {
                content: contentFI
                }
                
                }).then(()=> {
                    this.props.history.push(`/course/${Number(this.props.match.params.id)}`);
                }).catch(()=>{
                    alert("ther was an error, please check if you used hashes or quotes, if not try again later");
                })
            }
      }

    render() {
    let sectionlist = this.state.actualContent.length > 0
    	&& this.state.actualContent.map((item, i) => {
      return (
        <option key={i} value={item.section}>{item.section}</option>
      )
    }, this);
        return (
            <div className="courses">
                {this.props.registered === true?
                <div>
                    
                    
                    <form onSubmit={this.handleSubmit} className="Register">
                    <h1>Add guide</h1>
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
            <label>select section:</label>
  <select name="section" onChange={this.handleChange} className="select">
            {sectionlist}
            <option value="NEW">New</option>
  </select>
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

export default withRouter(AddContent);