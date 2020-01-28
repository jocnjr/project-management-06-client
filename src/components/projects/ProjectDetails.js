// components/projects/ProjectDetails.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import AddTask from "../tasks/AddTask";

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getSingleProject = this.getSingleProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject() {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_API}/projects/${params.id}`, {
        withCredentials: true
      })
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        console.log(theProject);
        this.setState(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  }
  ownershipCheck = project => {
    if (
      this.props.loggedInUser &&
      project.owner === this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteProject(this.state._id)}>
            Delete project
          </button>
        </div>
      );
    }
  };

  renderEditForm() {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      return (
        <EditProject
          theProject={this.state}
          getTheProject={this.getSingleProject}
          {...this.props}
        />
      );
    }
  }

  deleteProject() {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_API}/projects/${params.id}`, {
        withCredentials: true
      })
      .then(() => {
        this.props.history.push("/projects"); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderAddTaskForm() {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      // pass the project and method getSingleProject() as a props down to AddTask component
      return (
        <AddTask
          theProject={this.state}
          getTheProject={this.getSingleProject}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <h1> {this.state.title} </h1> <p> {this.state.description} </p>{" "}
        {/* show the task heading only if there are tasks */}{" "}
        {this.state.tasks && this.state.tasks.length > 0 && <h3> Tasks </h3>}{" "}
        {/* map through the array of tasks and... */}{" "}
        {this.state.tasks &&
          this.state.tasks.map((task, index) => {
            return (
              <div key={index}>
                {" "}
                {/* ... make each task's title a link that goes to the task details page */}{" "}
                <Link to={`/projects/${this.state._id}/tasks/${task._id}`}>
                  {" "}
                  {task.title}{" "}
                </Link>{" "}
              </div>
            );
          })}{" "}
        <div>{this.ownershipCheck(this.state)}</div>
        <br />
        <div> {this.renderAddTaskForm()} </div> <br />
        <br />
        <br />
        <Link to={"/projects"}> Back to projects </Link>{" "}
      </div>
    );
  }
}

export default ProjectDetails;
