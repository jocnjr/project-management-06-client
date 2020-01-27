import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProjectList from "./components/projects/ProjectList";
import ProjectDetails from "./components/projects/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";
import Signup from "./components/auth/Signup";
import AuthService from "./components/auth/auth-service";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/protected-route";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    });
  }

  render() {
    // auth engine
    this.fetchUser();
    return (
      <div className="App">
        <Navbar
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
        />

        {this.state.loggedInUser ? (
          <Switch>
            <ProtectedRoute
              exact
              path="/projects"
              user={this.state.loggedInUser}
              component={ProjectList}
            />
            <ProtectedRoute
              exact
              path="/projects/:id"
              user={this.state.loggedInUser}
              component={ProjectDetails}
            />
            )} />
            <ProtectedRoute
              exact
              path="/projects/:id/tasks/:taskId"
              user={this.state.loggedInUser}
              component={TaskDetails}
            />
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path="/signup"
              user={this.state.loggedInUser}
              render={props => <Signup getUser={this.getTheUser} {...props} />}
            />
            <Route
              exact
              path="/"
              user={this.state.loggedInUser}
              render={props => <Login getUser={this.getTheUser} {...props} />}
            />
            <ProtectedRoute exact path="/projects" component={ProjectList} />
            <ProtectedRoute
              exact
              path="/projects/:id"
              user={this.state.loggedInUser}
              component={ProjectDetails}
            />
            <ProtectedRoute
              exact
              path="/projects/:id/tasks/:taskId"
              user={this.state.loggedInUser}
              component={TaskDetails}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
