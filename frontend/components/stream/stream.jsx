import React from 'react';
import Player from '../player/player';

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    const trackList = this.props.tracks.map(track => (
      <li key={track.id}>
        <Player url={track.url} title={track.title} />
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