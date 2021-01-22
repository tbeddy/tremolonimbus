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

  componentDidUpdate() {
    const { user } = this.props;
    if (user) {
      document.title = `${user.username} | Free Listening on TremoloNimbus`;
    }
  }

  render() {
    const { currentUserId, id, tracks, user } = this.props;
    if (!user) return null;
    const trackList = (tracks === undefined) ? null : tracks.map(track => (
      <li key={track.id}>
        <PlayerContainer {...track} />
      </li>
    ));
    const profileButtons = (currentUserId != id) ? null : (
      <div className="profile-buttons">
        <button
          className="delete-track-button"
          onClick={() => this.props.openModal("profileEdit")}
        >
          <img src={window.pencilURL} />
          <span>Edit</span>
        </button>
      </div>
    );
    const { username, displayname, firstname, lastname, city, country } = user;
    let location;
    if ((!city) && (!country)) {
      location = "";
    } else if ((!city) && (country)) {
      location = country;
    } else if ((city) && (!country)) {
      location = city;
    } else {
      location = city + ", " + country;
    }
    let realname;
    if ((!firstname) && (!lastname)) {
      realname = "";
    } else if ((!firstname) && (lastname)) {
      realname = lastname;
    } else if ((firstname) && (!lastname)) {
      realname = firstname;
    } else {
      realname = firstname + " " + lastname;
    }
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
              {!displayname ? username : displayname}
            </div>
            {realname === "" ? null : <br/>}
            {realname === "" ? null : (
              <div className="profile-other-info">{realname}</div>
            )}
            {location === "" ? null : <br />}
            {location === "" ? null : (
              <div className="profile-other-info">{location}</div>
            )}
          </div>
        </div>
        <div className="profile-tabs-and-buttons">
          <div className="profile-tabs">
          </div>
          {profileButtons}
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