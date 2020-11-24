import React from 'react';
import { toMinutesAndSeconds } from '../../util/player_util';

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
    if (this.props.playing) {
      this.setState({
        percentDone: 100 * (trackAudio.currentTime / trackAudio.duration)
      });
    } else if (this.props.currentTrackId !== this.props.id) {
      this.setState({
        percentDone: 0
      });
    }
  }

  playOrPause() {
    if (this.props.playing) {
      this.props.pauseTrack(this.props.id);
    } else {
      this.props.playTrack(this.props.id);
    }
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
    const trackAudio = document.getElementById("audio");
    const { seekPosition } = this.state;
    trackAudio.currentTime = seekPosition * trackAudio.duration;
    this.updateTime();
    this.updateBar();
  }

  render() {
    let orangeBarWidth;
    orangeBarWidth = this.state.percentDone;
    // if (this.props.currentTrackId === this.props.id) {
    //   orangeBarWidth = this.state.percentDone;
    // } else {
    //   orangeBarWidth = 0;
    // }
    return (
      <div className="page-player">
        <div className="track-info-and-button">
          <button
            className="play-pause-button"
            onClick={this.playOrPause}
          >
            <img
              src={this.props.playing ? window.pauseWhiteURL : window.playWhiteURL}
            />
          </button>
          <div>
            <p className="artist-name">
              Artist
            </p>
            <p className="track-name">
              {this.props.title}
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
            style={{ width: `${orangeBarWidth}%` }}
          ></div>
          <div className="track-times">
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

export default Player;