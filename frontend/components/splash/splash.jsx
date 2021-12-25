import React, { useEffect } from 'react';
import PlayerContainer from '../player/player_container';

export default ({ openModal, fetchTracks, tracks }) => {
  document.title = "TremoloNimbus — Listen to free music & podcasts on TremoloNimbus"

  useEffect(() => {
    fetchTracks();
  }, []);

  const trackList = tracks.map(track => (
    <li key={track.id}>
      <PlayerContainer {...track} />
    </li>
  ));

  return (
    <div id="splash">
      <img
        className="concert-img"
        src={window.audienceURL}
      />
      <p id="check-out-message">
        Check out what creators have already uploaded to the platform:
      </p>
      <ul>
        {trackList}
      </ul>
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
      <div id="splash-logo-links">
        <a href="https://github.com/tbeddy/tremolonimbus" target="_blank">
          <img
            className="outside-logo"
            src={window.githubURL}
          />
        </a>
        <a href="https://www.linkedin.com/in/timcmbedford" target="_blank">
          <img
            className="outside-logo"
            src={window.linkedInURL}
          />
        </a>
        <a href="https://tbeddy.github.io" target="_blank">
          <img
            className="outside-logo"
            src={window.resumeURL}
          />
        </a>
      </div>
    </div>
  )
}