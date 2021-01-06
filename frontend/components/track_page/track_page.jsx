import React from 'react';
import TrackPagePlayerContainer from './track_page_player_container'

class TrackPage extends React.Component {
  componentDidMount() {
    if (Object.keys(this.props.track).length === 0) {
      this.props.fetchTrack(this.props.match.params.trackId);
    }
  }

  render() {
    const { track, comments } = this.props;
    const commentList = comments.length === 0 ? (
      <div className="empty-comments-messages">
        <p>Seems a little quiet over here</p>
        <p>Be the first to comment on this track</p>
      </div>
    ) : (
      <div className="comment-list">
        <p>{`${comments.length} comment${comments.length === 1 ? "" : "s"}`}</p>
        {comments.map(({ id, body, user }) => (
          <div key={id}>
            <p>{user.username}: {body}</p>
          </div>
        ))}
      </div>
    );
    return (
      <div className="track-page">
        <TrackPagePlayerContainer {...track} />
        <div className="description-and-comments">
          <div className="description">
            {track.description ? track.description : null}
          </div>
          <div className="comments">
            {commentList}
          </div>
        </div>
      </div>
    )
  }
}

export default TrackPage;