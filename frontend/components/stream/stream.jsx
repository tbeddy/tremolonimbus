import React from 'react';
import PlayerContainer from '../player/player_container';

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.tracks.length === 0) {
      this.props.fetchTracks();
    }
  }

  render() {
    const trackList = this.props.tracks.map(track => (
      <li key={track.id}>
        <PlayerContainer {...track} />
      </li>
    ));
    return (
      <div className="stream">
        <p id="stream-top-message">
          Hear the latest posts from people on TremoloNimbus:
        </p>
        <ul>
          {trackList}
        </ul>
      </div>
    )
  }
}

export default Stream;