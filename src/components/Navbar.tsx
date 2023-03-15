import React, { Component } from "react";
import { Link } from "react-router-dom";

const logClick = () => {
  console.log("Settings btn Clicked");
};

class Navbar extends Component {
  render() {
    return (
      <nav id="navbar" className="navbar">
        <div id="navbar-container">
          <li>
            <Link to="/">TimeEntry</Link>
          </li>
          <li>
            <Link to="/ManageActivity">ManageActivity</Link>
          </li>
          <li>
            <Link to="/ManageActivity2">ManageActivity2</Link>
          </li>
          <li>
            <Link to="/UserProfile">UserProfile</Link>
          </li>
          <h4>ISE Time Tracker</h4>
          <h6>ISCRMDEV</h6>
          <h6>last Published: 10:00 AM 2/28/23</h6>
        </div>
      </nav>
    );
  }
}

export default Navbar;
