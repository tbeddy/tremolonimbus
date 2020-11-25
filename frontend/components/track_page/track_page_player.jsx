import React from 'react';
import Player from '../player/player';
import { toMinutesAndSeconds } from '../../util/player_util';

class TrackPagePlayer extends Player {
  render() {
    return (
      <div className="track-page-player">
        <div className="track-info-and-button">
          <button
            className="track-play-pause-button"
            onClick={this.playOrPause}
          >
            <img
              src={this.props.playing ? window.pauseWhiteURL : window.playWhiteURL}
            />
          </button>
          <div>
            <p className="track-artist-name">
              Artist
            </p>
            <p className="track-track-name">
              {this.props.title}
            </p>
          </div>
        </div>
        <div
          className="track-grey-bar"
          onClick={this.seekAudio}
          onMouseMove={this.changeSeekPosition}
        >
          <div
            className="orange-bar"
            style={{ width: `${this.state.percentDone}%` }}
          ></div>
          <div className="track-track-times">
            <div className="current-time">
              {toMinutesAndSeconds(this.state.currentTime)}
            </div>
            {/* <div className="duration">
              {toMinutesAndSeconds(this.state.duration)}
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default TrackPagePlayer;