import React from "react";

const ButtonRow = () => {
  return (
    <div id="top-buttons-container">
      <button
        type="button"
        //onClick={}
        className="top-button"
      >
        + By Organization
      </button>
      <button
        type="button"
        //onClick={}
        className="top-button"
      >
        + By Engagement / IS Request
      </button>{" "}
      <button
        type="button"
        //onClick={}
        className="top-button"
      >
        + Overhead Time
      </button>{" "}
      <button
        type="button"
        //onClick={}
        className="top-button"
      >
        + Customer Programs
      </button>
      <button
        type="button"
        //onClick={}
        className="top-button"
      >
        + Industry Event
      </button>
    </div>
  );
};

export default ButtonRow;
