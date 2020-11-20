import React from 'react';

export default ({ openModal }) => {
  return (
    <div id="splash">
      <img
        className="concert-img"
        src={window.audienceURL}
      />
      <p id="message1">
        Thanks for listening. Now join in.
      </p>
      <p id="message2">
        Save tracks, follow artists and build playlists. All for free.
      </p>
      <button
        className="create-account-button"
        onClick={() => openModal('signup')}
      >Create account</button>
      <div id="signin_message">
        <p id="message3">
          Already have an account?
        </p>
        <button
          className="sign-in-button"
          onClick={() => openModal('login')}
        >Sign in</button>
      </div>
    </div>
  )
}