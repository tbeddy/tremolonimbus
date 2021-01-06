import React from 'react';
import users_reducer from '../../reducers/users_reducer';
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
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-picture" />
          <div className="profile-info">
            <div className="profile-name">
              {this.props.user.username}
            </div>
          </div>
        </div>
        <p className="recent-header">
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