import React from 'react';
import { Link } from 'react-router-dom';
import { toMinutesAndSeconds } from '../../util/player_util';
import { generateProfilePicture } from '../../util/pic_util';

class ContinuousPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      percentDone: 0,
      volumeSliderOpen: false
    };

    this.timeInterval = null;
    this.barInterval = null;

    this.playOrPause = this.playOrPause.bind(this);
    this.seekAudio = this.seekAudio.bind(this);
    this.changeSeekPosition = this.changeSeekPosition.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.openVolumeSlider = this.openVolumeSlider.bind(this);
    this.closeVolumeSlider = this.closeVolumeSlider.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
    this.barInterval = setInterval(() => this.updateBar(), 10);

    const trackAudio = document.getElementById("audio");
    trackAudio.addEventListener("ended", () => {
      if (!this.props.looping) this.props.clearTrack();
    });

    // document.addEventListener('keyup', event => {
    //   if (event.code === 'Space') {
    //     this.playOrPause();
    //   }
    // });
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    clearInterval(this.barInterval);
  }

  updateTime() {
    const trackAudio = document.getElementById("audio");
    this.setState({
      currentTime: Math.floor(trackAudio.currentTime)
    });
  }

  openVolumeSlider() {
    this.setState({ volumeSliderOpen: true });
  }

  closeVolumeSlider() {
    this.setState({ volumeSliderOpen: false });
  }

  changeVolume(e) {
    const trackAudio = document.getElementById("audio");
    trackAudio.volume = e.currentTarget.value;
  }

  updateBar() {
    const trackAudio = document.getElementById("audio");
    this.setState({
      percentDone: 100 * (trackAudio.currentTime / trackAudio.duration)
    });
  }

  playOrPause() {
    if (this.props.id === null) return;
    const trackAudio = document.getElementById("audio");
    if (this.props.playing) {
      trackAudio.pause();
      this.props.pauseTrack(this.props.id);
    } else {
      trackAudio.play();
      this.props.playTrack(this.props.id);
    }
  }

  changeSeekPosition(e) {
    const { x, width } = e.target.getBoundingClientRect();
    this.setState({
      seekPosition: (e.clientX - x) / width
    });
  }

  seekAudio() {
    const trackAudio = document.getElementById("audio");
    const { seekPosition } = this.state;
    trackAudio.currentTime = seekPosition * trackAudio.duration;
    this.updateTime();
    this.updateBar();
  }

  toggleLoop() {
    this.props.toggleLoop();
  }

  volumeIcon() {
    const trackAudio = document.getElementById("audio");
    if (trackAudio === null) return null;
    const currentVolume = trackAudio.volume;
    if (currentVolume >= 0.66) {
      return window.volumeUpURL;
    } else if ((currentVolume < 0.66) && (currentVolume >= 0.33)) {
      return window.volumeMiddleURL;
    } else if ((currentVolume < 0.33) && (currentVolume > 0)) {
      return window.volumeLowURL;
    } else {
      return window.volumeMuteURL;
    }
  }

  render() {
    const trackAudio = document.getElementById("audio");
    const volumeSlider = !this.state.volumeSliderOpen ? null : (
      <div id="volume-slider-container">
        <input id="volume-slider" type="range"
          min="0.0" max="1.0" step="0.01"
          onChange={this.changeVolume}
        />
      </div>
    );
    const continuousPlayer = (
      <div className="continuous-player-and-sidebars">
        <div className="sidebar continuous-player-sidebar" />
        <div className="continuous-player">
          <button
            className="continuous-play-pause-button"
            onClick={this.playOrPause}
          >
            <img
              className="player-icon"
              src={this.props.playing ? window.pauseBlackURL : window.playBlackURL}
            />
          </button>
          <button
            className="continuous-loop-button"
            onClick={this.toggleLoop}
          >
            <img
              className="player-icon"
              src={this.props.looping ? window.loopOrangeURL : window.loopBlackURL}
            />
          </button>
          <span className="current-start-time">
            {toMinutesAndSeconds(this.state.currentTime)}
          </span>
          <div
            className="containing-bar"
            onClick={this.seekAudio}
            onMouseMove={this.changeSeekPosition}
          >
            <div
              className="current-grey-bar"
            >
              <div
                className="current-orange-bar"
                style={{ width: `${this.state.percentDone}%` }}
              ></div>
            </div>
          </div>
          <span className="current-end-time">
            {trackAudio ? toMinutesAndSeconds(trackAudio.duration) : "0:00"}
          </span>
          <button
            className="volume-button"
            onMouseEnter={this.openVolumeSlider}
            onMouseLeave={this.closeVolumeSlider}
          >
            <img
              className="player-icon"
              src={this.volumeIcon()}
            />
            {volumeSlider}
          </button>
          <div className="current-track-details">
            {!this.props.track ? null : (
              <div
                className="current-track-picture"
                style={{ "backgroundImage": generateProfilePicture(this.props.uploader.id) }}
              />
            )}
            <div className="current-track-text">
              <p className="current-artist-name">
                {!this.props.track ? "Artist" : (
                  <Link to={`/users/${this.props.uploader.id}`}>
                    {this.props.track ? this.props.uploader.username : "Artist"}
                  </Link>
                )}
              </p>
              <p className="current-track-name">
                {!this.props.track ? "Title" : (
                  <Link to={`/tracks/${this.props.track.id}`}>
                    {this.props.track ? this.props.track.title : "Title"}
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="sidebar continuous-player-sidebar" />
      </div>
    );
    const { track } = this.props;
    if (this.props.playing) {
      trackAudio.play().catch(_ => trackAudio.play());
    } else if (trackAudio !== null) {
      trackAudio.pause();
    }
    return (
      <div>
        <audio
          id="audio"
          src={track === undefined ? null : track.url}
        ></audio>
        {(this.props.id === null) ? null : continuousPlayer}
      </div>
    )
  }
}

export default ContinuousPlayer;