import React, { Component } from "react";
import { Link } from "react-router-dom";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { FontIcon } from "@fluentui/react/lib/Icon";

const iconClass = mergeStyles({
  fontSize: 30,
  height: 30,
  width: 30,
  margin: "0 25px 0 25px",
});

const SettingsIcon = () => (
  <FontIcon iconName="Settings" onClick={logClick} className={iconClass} />
);

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
          <Link to="/ ">
            <h3 id="title-header" className="">
              ISE Time Tracker
            </h3>
          </Link>
          <Link to="/UserProfile">
            <SettingsIcon aria-label="Settings" />
          </Link>
          <h6>last Published: 10:00 AM 2/28/23</h6>
        </div>
      </nav>
    );
  }
}

export default Navbar;
