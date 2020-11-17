import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout, openModal }) => {
  return currentUser ? (
    <div className="greeting-bar">
      <div>TremoloNimbus</div>
      <p>
        Welcome, {currentUser.username}
      </p>
      <button onClick={logout}>Log Out</button>
    </div>
  ) : (
    <div className="greeting-bar">
      <div>TremoloNimbus</div>
      <button
        className="sign-in-button"
        onClick={() => openModal('login')}
      >Sign in</button>
      <button
        className="create-account-button"
        onClick={() => openModal('signup')}
      >Create account</button>
    </div>
  );
}