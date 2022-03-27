import React from "react";
import user from "../images/user.png";
import { useNavigate, useLocation } from "react-router-dom";

// returns jsx of the card component
const ContactDetails = (props) => {
  const location = useLocation();
  const { name, email } = location.state;
  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    navigate("/", { replace: true });
  }
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user"></img>
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="ui button blue center" onClick={handleSubmit}>
          Back to Contacts List
        </button>
      </div>
    </div>
  );
};
export default ContactDetails;
