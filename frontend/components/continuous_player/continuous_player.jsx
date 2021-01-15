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

    this.audio = React.createRef();

    this.timeInterval = null;
    this.barInterval = null;

    this.playOrPause = this.playOrPause.bind(this);
    this.seekAudio = this.seekAudio.bind(this);
    this.changeSeekPosition = this.changeSeekPosition.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.openVolumeSlider = this.openVolumeSlider.bind(this);
    this.closeVolumeSlider = this.closeVolumeSlider.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
    this.barInterval = setInterval(() => this.updateBar(), 10);

    const volume = localStorage.getItem('volume');
    const muted = localStorage.getItem('muted');
    const trackId = localStorage.getItem('trackId');

    if (volume) this.props.changeVolume(volume);
    if (muted === 'true') this.props.toggleMute();
    if (trackId) {
      this.props.fetchTrack(trackId)
        .then(({ track }) => this.props.pauseTrack(track.id));
    }

    this.audio.current.addEventListener("ended", () => {
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

  componentDidUpdate() {
    if (!!this.props.track) this.audio.current.volume = this.props.volume;
  }

  updateTime() {
    this.setState({
      currentTime: Math.floor(this.audio.current.currentTime)
    });
  }

  openVolumeSlider() {
    this.setState({ volumeSliderOpen: true });
  }

  closeVolumeSlider() {
    this.setState({ volumeSliderOpen: false });
  }

  changeVolume(volume) {
    this.props.changeVolume(volume);
    if (this.props.muted) this.toggleMute();
    localStorage.setItem('volume', volume);
  }

  toggleMute() {
    this.props.toggleMute();
    localStorage.setItem('muted', !this.props.muted);
  }

  updateBar() {
    const audio = this.audio.current;
    this.setState({
      percentDone: 100 * (audio.currentTime / audio.duration)
    });
  }

  playOrPause() {
    if (this.props.id === null) return;
    const audio = this.audio.current;
    if (this.props.playing) {
      audio.pause();
      this.props.pauseTrack(this.props.id);
    } else {
      audio.play();
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
    const audio = this.audio.current;
    const { seekPosition } = this.state;
    audio.currentTime = seekPosition * audio.duration;
    this.updateTime();
    this.updateBar();
  }

  volumeIcon() {
    const currentVolume = this.props.volume;
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
    const audio = this.audio.current;
    const volumeSlider = !this.state.volumeSliderOpen ? null : (
      <div id="volume-slider-container">
        <input id="volume-slider" type="range"
          min="0.0" max="1.0" step="0.01"
          value={this.props.volume}
          onChange={e => this.changeVolume(e.currentTarget.value)}
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
            onClick={this.props.toggleLoop}
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
            {audio ? toMinutesAndSeconds(audio.duration) : "0:00"}
          </span>
          <button
            className="volume-button"
            onMouseEnter={this.openVolumeSlider}
            onMouseLeave={this.closeVolumeSlider}
          >
            <img
              className="player-icon"
              src={this.volumeIcon()}
              onClick={this.toggleMute}
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
      audio.play().catch(_ => audio.play());
    } else if (audio !== null) {
      audio.pause();
    }
    return (
      <div>
        <audio
          id="audio"
          src={track === undefined ? null : track.url}
          ref={this.audio}
        ></audio>
        {(this.props.id === null) ? null : continuousPlayer}
      </div>
    )
  }
}

export default ContinuousPlayer;