import React, { Component } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import ContactCard from "./contactcard";
import AddContact from "./addcontact";
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      contactlist: [],
      id: "",
      edit: true
    };
  }

  componentDidMount() {
    axios.get("http://Localhost:4000/contacts").then(res =>
      this.setState({
        contactlist: res.data
      })
    );
  }
  updateList = value => {
    this.setState({
      contactlist: value
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  newContact = () => {
    axios
      .post("http://Localhost:4000/add-contact", {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(res =>
        axios.get("http://Localhost:4000/contacts").then(res => this.updateList(res.data))
      );
  };

  modal = (edit, props) => {
    this.setState({
      name: props.name,
      phone: props.phone,
      email: props.email,
      id: props._id,
      edit
    });
  };

  modifyContact = () => {
    axios
      .put("http://Localhost:4000/modify-contact/" + this.state.id, {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(res =>
        axios.get("http://Localhost:4000/contacts").then(res => this.updateList(res.data))
      );
  };
  deleteContact = contactId => {
    axios
      .delete("http://Localhost:4000/delete-contact/" + contactId)
      .then(res =>
        axios.get("http://Localhost:4000/contacts").then(res => this.updateList(res.data))
      );
  };
  clearInput = () => {
    this.setState({
      name: "",
      phone: "",
      email: ""
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1>My Contacts</h1>
          <Link to="/contact-list">
            <button className="button" onClick={this.clearInput}>
              Contact List
            </button>
          </Link>
          <Link to="/new-contact">
            <button
              className="button"
              onClick={() => {
                this.clearInput();
                this.setState({ edit: true });
              }}
            >
              Add Contact
            </button>
          </Link>
        </div>
        <Route
          path="/contact-list"
          render={() => (
            <div className="contact-list">
              {this.state.contactlist.map(el => (
                <ContactCard
                  contact={el}
                  deleteContact={this.deleteContact}
                  modifyContact={this.modifyContact}
                  modal={this.modal}
                  edit={this.state.edit}
                />
              ))}
            </div>
          )}
        />
        <Route
          path="/(new-contact|edit-contact)/"
          render={() => (
            <AddContact
              onChange={this.onChange}
              contact={this.state}
              newContact={this.newContact}
              clearInput={this.clearInput}
              modifyContact={this.modifyContact}
              modal={this.modal}
              edit={this.state.edit}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
