import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout, openModal }) => {
  return currentUser ? (
    <div className="greeting-bar">
      <Link to="/">
        <img
          className="logo-img"
          src={window.logoURL}
        />
      </Link>
      <div className="nav-buttons">
        <span>{currentUser.username}</span>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  ) : (
    <div className="greeting-bar">
      <Link to="/">
        <img
          className="logo-img"
          src={window.logoWithNameURL}
        />
      </Link>
      <div className="nav-buttons">
        <button
          className="sign-in-button"
          onClick={() => openModal('login')}
        >Sign in</button>
        <button
          className="create-account-button"
          onClick={() => openModal('signup')}
        >Create account</button>
      </div>
    </div>
  );
}