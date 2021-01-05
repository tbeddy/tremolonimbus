import React from 'react';
import PlayerContainer from '../player/player_container';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.id);
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
          Recent
        </p>
        <ul>
          {trackList}
        </ul>
      </div>
    )
  }
}

export default ProfilePage;