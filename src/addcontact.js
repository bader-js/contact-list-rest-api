import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  render() {
    if (this.state.clicked) {
      return <Redirect to="/contact-list" />;
    }
    return (
      <div className="add-card">
        <p className="card-title-add">New Contact</p>
        <input
          name="name"
          type="text"
          placeholder="Name..."
          onChange={this.props.onChange}
          value={this.props.contact.name}
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone..."
          onChange={this.props.onChange}
          value={this.props.contact.phone}
        />
        <input
          name="email"
          type="text"
          placeholder="Email..."
          onChange={this.props.onChange}
          value={this.props.contact.email}
        />
        <input
          type="button"
          value={(this.props.edit) ? "Add Contact" : "Edit Contact"}
          className="add-button"
          onClick={() => {
            if (this.props.edit) {
              this.props.newContact();
            } else {
              this.props.modifyContact()
            }
            this.props.clearInput();
            this.setState({
              clicked: true
            });
          }}
        />
      </div>
    );
  }
}
export default AddContact;