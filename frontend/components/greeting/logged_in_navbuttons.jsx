import React from 'react';
import { Link } from 'react-router-dom';
import { generateProfilePicture } from '../../util/pic_util';

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
        <div className="navbar-current-user">
          <div
            className="navbar-profile-picture"
            style={{ "backgroundImage": generateProfilePicture(this.props.currentUser.id) }}
          >
            {!this.props.currentUser.profileImage ? null : <img src={this.props.currentUser.profileImage} />}
          </div>
          <p>{this.props.currentUser.username}</p>
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