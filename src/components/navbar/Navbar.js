// components/navbar/Navbar.js
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../auth/auth-service";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();
  }
  componentDidUpdate(prevProps) {
    if (this.props.userInSession !== prevProps.userInSession) {
      this.setState({ loggedInUser: this.props.userInSession });
    }
  }

  logoutUser() {
    this.service
      .logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.getUser(null);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <nav className="nav-style">
        {this.state.loggedInUser ? (
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
              <NavLink
                activeStyle={{ color: "red" }}
                to="/projects"
                style={{ textDecoration: "none" }}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <button onClick={() => this.logoutUser()}>Logout</button>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Navbar;
