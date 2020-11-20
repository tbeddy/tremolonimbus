import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
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
    this.props.processForm({ user: this.state })
      .then(this.props.closeModal);
  }

  render() {
    const header = this.props.formType === "signup" ? "Sign Up" : "Log In";
    const errorList = this.props.errors.session.map((error, idx) => (
      <li key={idx}>
        {error}
      </li>
    ));
    const emailInput = this.props.formType === "login" ? null : (
      <input
        type="text"
        value={this.state.email}
        placeholder="Your Email"
        onChange={this.handleChange('email')}
      />
    );
    return (
      <div className="form-container">
        <ul>
          {errorList}
        </ul>
        <img
          className="form-logo"
          src={window.logoInverseURL}
        />
        <form
          className="session-form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            value={this.state.username}
            placeholder="Your Username"
            onChange={this.handleChange('username')}
          />
          {emailInput}
          <input
            type="password"
            value={this.state.password}
            placeholder="Your Password"
            onChange={this.handleChange('password')}
          />
          <button>{header}</button>
        </form>
      </div>
    )
  }
}

export default SessionForm;