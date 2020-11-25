import React from 'react';

class LoggedOutNavButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-buttons">
        <button
          className="sign-in-button"
          onClick={() => this.props.openModal('login')}
        >Sign in</button>
        <button
          className="create-account-button"
          onClick={() => this.props.openModal('signup')}
        >Create account</button>
      </div>
    )
  }
}

export default LoggedOutNavButtons;