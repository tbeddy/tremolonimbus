import React from 'react';
import { Link } from 'react-router-dom';
import { toMinutesAndSeconds } from '../../util/player_util';
import { generateProfilePicture } from '../../util/pic_util';

class Player extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTime: 0,
      percentDone: 0
    };

    this.timeInterval = null;
    this.barInterval = null;

    this.playOrPause = this.playOrPause.bind(this);
    this.seekAudio = this.seekAudio.bind(this);
    this.changeSeekPosition = this.changeSeekPosition.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
    this.barInterval = setInterval(() => this.updateBar(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    clearInterval(this.barInterval);
  }

  updateTime() {
    const trackAudio = document.getElementById("audio");
    if (this.props.playing) {
      this.setState({
        currentTime: Math.floor(trackAudio.currentTime)
      });
    }
  }

  updateBar() {
    const trackAudio = document.getElementById("audio");
    if (!this.props.isCurrentTrack) {
      this.setState({
        percentDone: 0
      });
    } else {
      this.setState({
        percentDone: 100 * (trackAudio.currentTime / trackAudio.duration)
      });
    }
  }

  playOrPause() {
    if (this.props.playing) {
      this.props.pauseTrack(this.props.id);
    } else {
      if (!this.props.isCurrentUsersTrack && !this.props.isCurrentTrack) {
        const fileData = new FormData();
        fileData.append('track[play_count]', this.props.play_count + 1);
        this.props.updateTrack(fileData, this.props.id);
      }
      this.props.playTrack(this.props.id);
    }
    localStorage.setItem('trackId', this.props.id);
  }

  changeSeekPosition(e) {
    const { x, width } = e.target.getBoundingClientRect();
    this.setState({
      seekPosition: (e.clientX  - x) / width
    });

    if (this.props.playing) {
      // Show the darker orange bar
    }
  }

  seekAudio() {
    if (!this.props.isCurrentTrack) {
      this.props.playTrack(this.props.id);
    }
    const trackAudio = document.getElementById("audio");
    const { seekPosition } = this.state;
    trackAudio.currentTime = seekPosition * trackAudio.duration;
    this.updateTime();
    this.updateBar();
  }

  deleteTrack() {
    if (this.props.currentTrackId === this.props.id) {
      this.props.clearTrack();
    }
    return this.props.deleteTrack(this.props.id);
  }

  render() {
    const currentTime = !this.props.isCurrentTrack ? null : (
      <div className="current-time">
        {toMinutesAndSeconds(this.state.currentTime)}
      </div>
    );
    const deleteAndEditButtons = !this.props.isCurrentUsersTrack ? (
      <div></div>
    ) : (
      <div className="track-buttons">
        <button
          className="delete-track-button"
          onClick={() => this.props.openModal("trackEdit", this.props.id)}
        >
          <img src={window.pencilURL} />
          <span>Edit</span>
        </button>
        <button
          className="delete-track-button"
          onClick={this.deleteTrack}
        >
          <img src={window.trashBlackURL} />
          <span>Delete track</span>
        </button>
      </div>
    );
    return (
      <div className="page-player">
        <div
          className="page-player-picture"
          style={{ "backgroundImage": generateProfilePicture(this.props.uploader.id) }}
        />
        <div className="page-player-except-picture">
          <div className="track-info-and-button">
            <button
              className="play-pause-button"
              onClick={this.playOrPause}
            >
              <img
                src={this.props.playing ? window.pauseWhiteURL : window.playWhiteURL}
              />
            </button>
            <div className="player-track-info">
              <p className="artist-name">
                <Link to={`/users/${this.props.uploader.id}`}>
                  {this.props.uploader.username}
                </Link>
              </p>
              <p className="track-name">
                <Link to={`/tracks/${this.props.id}`}>
                  {this.props.title}
                </Link>
              </p>
            </div>
          </div>
          <div
            className="grey-bar"
            onClick={this.seekAudio}
            onMouseMove={this.changeSeekPosition}
          >
            <div
              className="orange-bar"
              style={{ width: `${this.state.percentDone}%` }}
            ></div>
            <div className="track-times">
              {currentTime}
              {/* <div className="duration">
                {toMinutesAndSeconds(this.state.duration)}
              </div> */}
            </div>
          </div>
          <div className="track-buttons">
            {deleteAndEditButtons}
            <div className="track-data">
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

export default Player;