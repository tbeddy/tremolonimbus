import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Player from '../player/player';
import { toMinutesAndSeconds } from '../../util/player_util';
import {
  generateProfilePicture,
  generateProfileBackground
} from '../../util/pic_util';

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
    const trackButtons = (
      <div className="track-buttons">
        <div>
          <button
            className={this.props.isLiked ? "liked-button" : ""}
            onClick={this.props.currentUserId ? this.likeOrUnlikeTrack : (
              () => this.props.openModal('login')
            )}
          >
            <img src={this.props.isLiked ? window.heartOrangeURL : window.heartBlackURL} />
            <span>{this.props.isLiked ? "Liked" : "Like"}</span>
          </button>
        </div>
        {!this.props.isCurrentUsersTrack ? null : (
          <button
            className="delete-track-button"
            onClick={() => this.props.openModal("trackEdit", this.props.id)}
          >
            <img src={window.pencilURL} />
            <span>Edit</span>
          </button>
        )}
        {!this.props.isCurrentUsersTrack ? null : (
          <button
            className="delete-track-button"
            onClick={this.deleteTrack}
          >
            <img src={window.trashBlackURL} />
            <span>Delete track</span>
          </button>
        )}
      </div>
    );
    const hoverBar = (!this.state.hovering || !this.props.playing) ? null : (
      <div
        className="hover-orange-bar"
        style={{
          left: `${this.state.hoverStart}%`,
          right: `${this.state.hoverEnd}%`
        }}
      />
    );
    return (
      <div>
        <div
          className="track-background"
          style={{ "backgroundImage": generateProfileBackground(this.props.uploader.id) }}
        >
          <div className="track-page-player">
            <div className="track-page-player-except-picture">
              <div className="track-info-and-button">
                <button
                  className="track-play-pause-button"
                  onClick={this.playOrPause}
                >
                  <img
                    src={this.props.playing ? window.pauseWhiteURL : window.playWhiteURL}
                  />
                </button>
                <div className="player-track-info">
                  <div className="track-artist-name">
                    <p>
                      <Link to={`/users/${this.props.uploader.id}`}>
                        {this.props.uploader.username}
                      </Link>
                    </p>
                  </div>
                  <div className="track-track-name">
                    <p>
                      {this.props.title}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="track-grey-bar"
                onClick={this.props.playing ? this.seekAudio : this.playOrPause}
                onMouseMove={this.changeSeekPosition}
                onMouseEnter={() => this.setState({ hovering: true })}
                onMouseLeave={() => this.setState({ hovering: false })}
              >
                <div
                  className="orange-bar"
                  style={{ width: `${this.state.percentDone}%` }}
                />
                {hoverBar}
                <div className="track-track-times">
                  {currentTime}
                  {/* <div className="duration">
                    {toMinutesAndSeconds(this.state.duration)}
                  </div> */}
                </div>
              </div>
            </div>
            {!this.props.uploader ? null : (
              <div
                className="track-page-player-picture"
                style={{ "backgroundImage": generateProfilePicture(this.props.uploader.id) }}
              >
                {!this.props.image ? null : (
                  <img
                    src={this.props.image}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="other-than-player">
          <div className="track-buttons">
            {trackButtons}
            <div className="track-data">
              {this.props.likes.length === 0 ? null : (
                <div className="like-count">
                  <img src={window.heartGreyURL} />
                  {this.props.likes.length}
                </div>
              )}
              {this.props.play_count === 0 ? null : (
                <div className="play-count">
                  <img src={window.playGreyURL} />
                  {this.props.play_count}
                </div>
              )}
              {this.props.comments.length === 0 ? null : (
                <div className="comment-count">
                  <img src={window.chatURL} />
                  {this.props.comments.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TrackPagePlayer);