import React from 'react';
import { Link } from 'react-router-dom';

class LoggedInNavButtons extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dotsDropdownOpen: false
    }

    this.toggleDotsDropdown = this.toggleDotsDropdown.bind(this);
  }

  toggleDotsDropdown() {
    this.setState({
      dotsDropdownOpen: !this.state.dotsDropdownOpen
    });
  }

  render() {
    const dotsDropdown = !this.state.dotsDropdownOpen ? null : (
      <div className="dots-dropdown">
        <button
          className="signout-button"
          onClick={this.props.logout}
        >Sign out</button>
      </div>
    );
    return (
      <div className="nav-buttons">
        <Link
          to="/upload"
          className="upload-link nav-button"
        >Upload</Link>
        <div>
          <span>{this.props.currentUser.username}</span>
        </div>
        <div className={this.state.nameDropdownOpen ? "black-back" : ""}>
          <img
            className="three-dots nav-button"
            src={window.threeDotsGreyURL}
            onClick={this.toggleDotsDropdown}
          ></img>
        </div>
        {dotsDropdown}
      </div>
    )
  }
}

export default LoggedInNavButtons;