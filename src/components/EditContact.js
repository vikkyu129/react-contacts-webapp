import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
//class component
class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = this.props.location.state;
    this.state = {
      id: id,
      name: name,
      email: email,
    };
  }
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Fields are empty, please check and retry!");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });
    // go back to the contact list(home) after clicking the submit
    this.props.navigate("/");
  };

  // we need to return render method
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.update}>
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
          <button className="ui button blue"> Update </button>
        </form>
      </div>
    );
  }
}
// wrapper component to pass props(here navigate) to a class component
function WithNavigateEditContact(props) {
  let navigate = useNavigate();
  let location = useLocation();
  return <EditContact {...props} navigate={navigate} location={location} />;
}
export default WithNavigateEditContact;
