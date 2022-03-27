import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

// returns jsx of the card component
const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user"></img>
      <div className="content">
        <Link to={`/contact/${id}`} state={{ name: name, email: email }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        onClick={() => props.deleteiconClickHandler(id)}
        style={{
          color: "red",
          float: "right",
          marginTop: "7px",
          marginLeft: "10px",
        }}
      ></i>
      <Link to={`/edit/${id}`} state={{ id: id, name: name, email: email }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", float: "right", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};
export default ContactCard;
