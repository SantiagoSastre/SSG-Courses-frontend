import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";


import NavBar from "./navigation/nav-bar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Courses from "./pages/courses";
import NoMatch from "./pages/no-match";
import Register from "./pages/register";
import Login from "./pages/login";
import UpdateProfile from "./pages/update-profile";
import DeleteProfile from "./pages/delete-profile";
import CreateCourse from "./pages/create-course";
import AddContent from "./pages/add_content";
import CoursePage from "./pages/course-page";
import CourseContent from "./pages/course-content";
import UpdateGuide from "./pages/update-guide";

export default class App extends Component {
  constructor(props) {
    super(props);

 
    this.state = {
      userId: Cookies.get('user'),
      username: "",
      description: "",
      tags: {},
      coursesTaking: ""
    };
    this.complete_Callback=this.complete_Callback.bind(this)
    this.update_Callback=this.update_Callback.bind(this)
    this.logout_Callback=this.logout_Callback.bind(this)
    this.courses_Callback=this.courses_Callback.bind(this)
  }
  componentDidMount() {
    if(this.state.userId !== undefined) {
      axios.get(`https://santisastre.a2hosted.com/flaskapp/user/id/${this.state.userId}`)
      .then( (response)=> {
        this.setState({
          userId: response.data.userId,
          username: response.data.name,
          description: response.data.description,
          tags: response.data.tags,
          coursesTaking: response.data.coursesTakingId
        });
      })
      .catch(function (error) {
        console.log(error);
        alert("we couldn't fetch your user, unless yo deleted it in another device try again later by reloading the page")
      })
    }
  }
  complete_Callback(completecallback){
    this.setState({
      userId:completecallback["userId"],
      username: completecallback["name"],
      description: completecallback["description"],
      tags: completecallback["tags"],
      coursesTaking: completecallback["coursesTakingId"]
  });
  }
  logout_Callback(logoutcallback){
    this.setState({
      userId:logoutcallback
  });
  }
  update_Callback(updatecallback){
    this.setState({
      username: updatecallback["name"],
      description: updatecallback["description"],
      tags: updatecallback["tags"],
      coursesTaking: updatecallback["coursesTakingId"]
  });
  }
  courses_Callback(coursescallback){
    this.setState({
      coursesTaking: coursescallback["coursesTaking"]
  });
  }
  render() {
    return (
      <div className='app'>
        <Router>
          <div>    
                <NavBar registered={this.state.userId !== undefined? true : false} name={this.state.username}/>
                <Switch>
                  <Route exact path="/" render={(props) => (
                    <Home {...props} registered={this.state.userId !== undefined? true : false} _id={this.state.userId}/>
                    )}/>
                  <Route path="/profile" render={(props) => (
                    <Profile {...props} registered={this.state.userId !== undefined? true : false} userData={{"userId":this.state.userId,"username":this.state.username,"description":this.state.description,"tags":this.state.tags} } callbackFromParents={this.logout_Callback}/>
                  )}/>
                  <Route path="/update-profile" render={(props) => (
                    <UpdateProfile {...props} registered={this.state.userId !== undefined? true : false} userId={this.state.userId} callbackFromParents={this.update_Callback}/>
                  )}/>
                  <Route path="/courses" render={(props) => (
                    <Courses {...props} registered={this.state.userId !== undefined? true : false}/>
                  )}/>
                   <Route path="/course/create" render={(props) => (
                    <CreateCourse {...props} registered={this.state.userId !== undefined? true : false} _id={this.state.userId}/>
                  )}/>
                  <Route  path="/course/add/:id" render={(props) => (
                    <AddContent {...props} registered={this.state.userId !== undefined? true : false} _id={this.state.userId}/>
                  )}/>
                  <Route  path="/course/:id" render={(props) => (
                    <CoursePage {...props} registered={this.state.userId !== undefined? true : false} _id={this.state.userId} coursesTaking={this.state.coursesTaking} callbackFromParents={this.courses_Callback}/>
                  )}/>
                  <Route  path="/update/c/:id" render={(props) => (
                    <UpdateGuide {...props} registered={this.state.userId !== undefined? true : false} />
                  )}/>
                  <Route  path="/take/:id" render={(props) => (
                    <CourseContent {...props} registered={this.state.userId !== undefined? true : false} _id={this.state.userId}/>
                  )}/>
                  <Route path="/register" render={props=><Register {...props} callbackFromParents={this.complete_Callback} registered={this.state.userId !== undefined? true : false}/>}/>
                  <Route  path="/login" render={props=><Login {...props} callbackFromParents={this.complete_Callback} registered={this.state.userId !== undefined? true : false}/>}/>
                  <Route path="/delete/user" render={(props) => (
                    <DeleteProfile {...props} registered={this.state.userId !== undefined? true : false} _id={this.state.userId} callbackFromParents={this.logout_Callback}/>
                  )}/>
                  <Route component={NoMatch}/>
                </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
