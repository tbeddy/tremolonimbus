import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm({ user: this.state });
  }

  render() {
    const header = this.props.formType === "signup" ? "Sign Up" : "Log In";
    const otherLink = this.props.formType === "signup" ? "login" : "signup";
    const errorList = this.props.errors.session.map((error, idx) => (
      <li key={idx}>
        {error}
      </li>
    ));
    return (
      <>
        <h3>{header}</h3>
        <Link to={`/${otherLink}`} />
        <ul>
          {errorList}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
          </label>
          <br />
          <label>Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
            <br />
            <button>{header}</button>
          </label>
        </form>
      </>
    )
  }
}

export default SessionForm;