import React from 'react';
import { Link } from 'react-router-dom';
import LoggedInNavButtons from './logged_in_navbuttons';
import LoggedOutNavButtons from './logged_out_navbuttons';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  search(e) {
    e.preventDefault();
  }
  
  render() {
    const { currentUser, logout, openModal } = this.props;
    const navButtons = currentUser ? (
      <LoggedInNavButtons logout={logout} currentUser={currentUser} />
    ) : (
      <LoggedOutNavButtons openModal={openModal} />
    );
    return (
      <div className="greeting-bar">
        <Link to="/">
          <img
            className="logo-img"
            src={currentUser ? window.logoURL : window.logoWithNameURL}
          />
        </Link>
        <div className="search">
          <form>
            <input
              type="text"
              placeholder="Search"
            />
            <button
              onClick={this.toggleDotsDropdown}
            >
              <img
                src={window.searchGreyURL}
              ></img>
            </button>
          </form>
        </div>
        {navButtons}
      </div>
    )
  }
}

export default Greeting;