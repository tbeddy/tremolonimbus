import React from 'react';
import { Link } from 'react-router-dom';
import { toMinutesAndSeconds } from '../../util/player_util';
import { generateProfilePicture } from '../../util/pic_util';

class Player extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTime: 0,
      percentDone: 0,
      hovering: false
    };

    this.timeAndBarInterval = null;

    this.playOrPause = this.playOrPause.bind(this);
    this.seekAudio = this.seekAudio.bind(this);
    this.changeSeekPosition = this.changeSeekPosition.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.likeOrUnlikeTrack = this.likeOrUnlikeTrack.bind(this);
  }

  componentDidMount() {
    this.timeAndBarInterval = setInterval(() => this.updateTimeAndBar(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timeAndBarInterval);
  }

  updateTimeAndBar() {
    const trackAudio = document.getElementById("audio");
    if (this.props.playing) {
      this.setState({
        currentTime: Math.floor(trackAudio.currentTime)
      });
    }
    if (!this.props.isCurrentTrack) {
      this.setState({
        percentDone: 0
      });
    } else {
      this.setState({
        percentDone: 100 * (trackAudio.currentTime / trackAudio.duration)
      });
    }
    
    if (this.state.hovering) {
      if ((this.state.percentDone / 100) > this.state.seekPosition) {
        this.setState({
          hoverStart: this.state.seekPosition * 100,
          hoverEnd: 100 - this.state.percentDone
        });
      } else {
        this.setState({
          hoverStart: this.state.percentDone,
          hoverEnd: 100 - (this.state.seekPosition * 100)
        });
      }
    } else {
      this.setState({
        hoverStart: 100,
        hoverEnd: 100
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
    const { x, width } = e.currentTarget.getBoundingClientRect();
    this.setState({
      seekPosition: (e.clientX  - x) / width
    });
  }

  seekAudio() {
    const trackAudio = document.getElementById("audio");
    const { seekPosition } = this.state;
    trackAudio.currentTime = seekPosition * trackAudio.duration;
  }

  deleteTrack() {
    if (this.props.currentTrackId === this.props.id) {
      this.props.clearTrack();
    }
    return this.props.deleteTrack(this.props.id);
  }

  likeOrUnlikeTrack() {
    if (this.props.isLiked) {
      const likeId = this.props.likes.filter(
        ({ liker_id }) => liker_id = this.props.currentUserId)
        [0].id
      return this.props.deleteLike(likeId);
    } else {
      const likeData = {
        liker_id: this.props.currentUserId,
        track_id: this.props.id
      };
      return this.props.createLike(likeData);
    }
  }

  render() {
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
            {this.props.likes.length === 0 ? null : <span>{this.props.likes.length}</span>}
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
      <div className="page-player">
        <div
          className="page-player-picture"
          style={{ "backgroundImage": generateProfilePicture(this.props.uploader.id) }}
        >
          {!this.props.image ? null : (
            <img
              src={this.props.image}
            />
          )}
        </div>
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
            <div className="track-times">
              {currentTime}
              {/* <div className="duration">
                {toMinutesAndSeconds(this.state.duration)}
              </div> */}
            </div>
          </div>
          <div className="track-buttons">
            {trackButtons}
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