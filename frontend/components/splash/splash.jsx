import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div id="splash">
      <p id="message1">
        Thanks for listening. Now join in.
      </p>
      <p id="message2">
        Save tracks, follow artists and build playlists. All for free.
      </p>
      <Link to="/signup">
        <button id="create-account-button">
          Create account
        </button>
      </Link>
      <div id="signin_message">
        <p>Already have an account?</p>
        <Link to="/login">
          <button id="sign-in-button">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  )
}