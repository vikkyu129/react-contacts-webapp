import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link, useLocation } from "react-router-dom";
// functional component

const ContactList = (props) => {
  const input_search_filter = useRef("");
  const renderContactList = props.contacts.map((contact) => {
    const deleteContactHandler = (id) => {
      props.getContactID(id);
    };
    return (
      <ContactCard
        contact={contact}
        deleteiconClickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });
  const getSearchFilter = () => {
    props.searchFilter(input_search_filter.current.value);
  };
  // return <div className="ui celled list">{renderContactList}</div>;
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button
            className="ui button"
            style={{ color: "blue", float: "right", marginLeft: "7px" }}
          >
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search" style={{ marginLeft: "5px" }}>
        <div className="ui icon input">
          <input
            ref={input_search_filter}
            type="text"
            placeholder="Search.. "
            className="prompt"
            value={props.search}
            onChange={getSearchFilter}
          ></input>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Available Contacts"}
      </div>
    </div>
  );
};
export default ContactList;
