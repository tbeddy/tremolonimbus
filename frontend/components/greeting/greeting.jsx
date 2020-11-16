import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout }) => {
  return currentUser ? (
    <div>
      <p>
        Welcome, {currentUser.username}
      </p>
      <button onClick={logout}>Log Out</button>
    </div>
  ) : (
    <div>
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">Log In</Link>
    </div>
  );
}