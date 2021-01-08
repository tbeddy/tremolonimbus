import React from 'react';
import PlayerContainer from '../player/player_container';
import {
  generateProfilePicture,
  generateProfileBackground
} from '../../util/pic_util';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.id);
  }

  render() {
    const { id, tracks, user } = this.props;
    if (!user) return null;
    const trackList = (tracks === undefined) ? null : tracks.map(track => (
      <li key={track.id}>
        <PlayerContainer {...track} />
      </li>
    ));
    return (
      <div className="profile-page">
        <div
          className="profile-header"
          style={{ "backgroundImage": generateProfileBackground(id) }}
        >
          <div
            className="profile-picture"
            style={{ "backgroundImage": generateProfilePicture(id) }}
          />
          <div className="profile-info">
            <div className="profile-name">
              {user.username}
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