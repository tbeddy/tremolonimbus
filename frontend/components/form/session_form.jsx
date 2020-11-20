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
    this.setUpDemoUser = this.setUpDemoUser.bind(this);
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm({ user: this.state })
      .then(this.props.disappearAndCloseModal);
  }

  setUpDemoUser() {
    this.setState({
      username: "demo user",
      password: "password"
    });
  }

  render() {
    const header = this.props.formType === "signup" ? "Sign Up" : "Log In";
    const errorList = this.props.errors.session.map((error, idx) => (
      <li key={idx} className="session-error">
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
    const demoUserButton = this.props.formType === "signup" ? null : (
      <button onClick={this.setUpDemoUser}>
        Demo User
      </button>
    );
    return (
      <div className="form-container">
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
          {demoUserButton}
          <ul>
            {errorList}
          </ul>
        </form>
      </div>
    )
  }
}

export default SessionForm;