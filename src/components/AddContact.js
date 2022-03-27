import React from "react";
import { useNavigate } from "react-router-dom";
//class component
class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Fields are empty, please check and retry!");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    // go back to the contact list(home) after clicking the submit
    this.props.navigate("/");
  };

  // we need to return render method
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <button className="ui button blue"> Add </button>
        </form>
      </div>
    );
  }
}
// wrapper component to pass props(here navigate) to a class component
function WithNavigateAddContact(props) {
  let navigate = useNavigate();
  return <AddContact {...props} navigate={navigate} />;
}
export default WithNavigateAddContact;
