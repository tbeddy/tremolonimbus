import React from 'react';
import { toMinutesAndSeconds } from '../../util/player_util';

class ContinuousPlayer extends React.Component {
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
    this.toggleLoop = this.toggleLoop.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
    this.barInterval = setInterval(() => this.updateBar(), 10);

    const trackAudio = document.getElementById("audio");
    trackAudio.addEventListener("ended", () => {
      if (!this.props.looping) this.props.clearTrack();
    });

    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        this.playOrPause();
      }
    });
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

  render() {
    const trackAudio = document.getElementById("audio");
    const continuousPlayer = (
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
        <div className="current-track-details">
          <p className="current-artist-name">
            {this.props.track ? this.props.uploader.username : "Artist"}
          </p>
          <p className="current-track-name">
            {this.props.track ? this.props.track.title : "Title"}
          </p>
        </div>
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