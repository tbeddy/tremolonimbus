import React from 'react';
import TrackPagePlayerContainer from './track_page_player_container'

class TrackPage extends React.Component {
  componentDidMount() {
    if (Object.keys(this.props.track).length === 0) {
      this.props.fetchTrack(this.props.match.params.trackId);
    }
  }

  render() {
    const { track } = this.props;
    return (
      <div className="track-page">
        <TrackPagePlayerContainer {...track} />
        <div className="description-and-comments">
          {track.description ? track.description : null}
        </div>
      </div>
    )
  }
}

export default TrackPage;