import React from 'react';

class ContinuousPlayer extends React.Component {
  render() {
    return (
      <div className="continuous-player">
        <button
          className="continuous-play-pause-button"
        >
          <img src={window.playBlackURL} />
        </button>
        <span className="current-start-time">start</span>
        <div className="current-grey-bar">
          <div className="current-orange-bar">

          </div>
        </div>
        <span className="current-end-time">end</span>
        <div className="current-track-details">
          <p className="current-artist-name">
            Artist
          </p>
          <p className="current-track-name">
            Title
          </p>
        </div>
      </div>
    )
  }
}

export default ContinuousPlayer;