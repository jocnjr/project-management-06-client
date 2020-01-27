import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProject from "./AddProject"; // <== !!!

class ProjectList extends Component {
  constructor() {
    super();
    this.state = { listOfProjects: [] };
    this.getAllProjects = this.getAllProjects.bind(this);
  }

  getAllProjects() {
    axios.get(`http://localhost:5000/api/projects`).then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data
      });
    });
  }

  componentDidMount() {
    this.getAllProjects();
  }

  deleteProject(projectID) {
    axios
      .delete(`http://localhost:5000/api/projects/${projectID}`, {
        withCredentials: true
      })
      .then(() => {
        this.getAllProjects();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfProjects.map(project => {
            return (
              <div id={project._id} key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                <ul>
                  {project.tasks.map((task, index) => {
                    return <li key={index}>{task.title}</li>;
                  })}
                </ul>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
                {this.props.loggedInUser &&
                  this.props.loggedInUser._id === project.owner && (
                    <button onClick={() => this.deleteProject(project._id)}>
                      Delete project
                    </button>
                  )}
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <AddProject getData={this.getAllProjects} /> {/* <== !!! */}
        </div>
      </div>
    );
  }
}

export default ProjectList;
