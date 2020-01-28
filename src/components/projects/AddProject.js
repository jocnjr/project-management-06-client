// components/projects/AddProject.js

import React, { Component } from "react";
import axios from "axios";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    axios
      .post(
        process.env.REACT_APP_API + "/projects",
        { title, description },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
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

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
