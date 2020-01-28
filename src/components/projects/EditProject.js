// components/projects/EditProject.js

import React, { Component } from "react";
import axios from "axios";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.theProject.title,
      description: this.props.theProject.description
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    const title = this.state.title;
    const description = this.state.description;

    event.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_API}/projects/${this.props.theProject._id}`,
        {
          title,
          description
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getTheProject();
        // after submitting the form, redirect to '/projects'
        this.props.history.push("/projects");
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <br />

          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <label>Description:</label>
          <br />

          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProject;
