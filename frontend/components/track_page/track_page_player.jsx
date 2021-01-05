import React from 'react';
import Player from '../player/player';
import { toMinutesAndSeconds } from '../../util/player_util';
import { withRouter, Link } from 'react-router-dom';

class TrackPagePlayer extends Player {
  deleteTrackandRedirect() {
    this.deleteTrack().then(() => this.props.history.push("/"));
  }

  render() {
    if (!this.props.id) return null; 
    const currentTime = !this.props.isCurrentTrack ? null : (
      <div className="current-time">
        {toMinutesAndSeconds(this.state.currentTime)}
      </div>
    );
    const deleteButton = !this.props.isCurrentUsersTrack ? (
      <div></div>
    ) : (
      <button
        className="delete-track-button"
        onClick={this.deleteTrack}
      >
        <img src={window.trashBlackURL} />
        <span>Delete track</span>
      </button>
    );
    return (
      <div>
        <div className="track-background">
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
                <div className="track-artist-name">
                  <p>
                    <Link to={`/users/${this.props.uploader.id}`}>
                      {this.props.uploader.username}
                    </Link>
                  </p>
                </div>
                <br/>
                <div className="track-track-name">
                  <p>
                    {this.props.title}
                  </p>
                </div>
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
              {currentTime}
              {/* <div className="duration">
                {toMinutesAndSeconds(this.state.duration)}
              </div> */}
            </div>
          </div>
        </div>
        </div>
        <div className="other-than-player">
          <div className="track-buttons">
            {deleteButton}
            <div className="play-count">
              <img src={window.playGreyURL} />
              {this.props.play_count}
            </div>
          </div>
          {this.props.description ? this.props.description : null}
        </div>
      </div>
    )
  }
}

export default withRouter(TrackPagePlayer);