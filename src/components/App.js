import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import WithNavigateAddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import { v4 as uuidv4 } from "uuid";
import api from "../api/contacts";
import WithNavigateEditContact from "./EditContact";
// import ContactCard from "./ContactCard";
// to use states in funtional components we need hooks -> useState

function App() {
  //using LocalStorage for persistent Data
  const LOCAL_STORAGE_KEY = "contacts";

  // Intitalizing the state of the component with an empty list
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // adding a handler to update the value from child to parent
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  // removing a contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const new_contacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(new_contacts);
  };

  const searchHandler = (searchFiltervalue) => {
    setSearch(searchFiltervalue);
    if (searchFiltervalue !== "") {
      const searcresultContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchFiltervalue.toLowerCase());
      });
      setSearchResults(searcresultContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // retrieve contacts from api server
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    // const prev_contacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (prev_contacts) setContacts(prev_contacts);
    const retrieveAllContacts = async () => {
      const retrievedContacts = await retrieveContacts();
      if (retrievedContacts) setContacts(retrievedContacts);
    };
    retrieveAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={search.length < 1 ? contacts : searchResults}
                getContactID={removeContactHandler}
                search={search}
                searchFilter={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={
              <WithNavigateAddContact addContactHandler={addContactHandler} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <WithNavigateEditContact
                updateContactHandler={updateContactHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
          {/* <AddContact addContactHandler={addContactHandler} /> */}
          {/* <ContactList contacts={contacts} getContactID={removeContactHandler} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
