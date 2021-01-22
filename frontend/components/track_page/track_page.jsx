import React from 'react';
import { Link } from 'react-router-dom';
import TrackPagePlayerContainer from './track_page_player_container';
import { generateProfilePicture } from '../../util/pic_util';

class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: ""
    }

    this.updateCommentInput = this.updateCommentInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.match.params.trackId);
  }

  componentDidUpdate() {
    const { uploader, track } = this.props;
    if (uploader) {
      document.title = `${track.title} by ${uploader.username} | Free Listening on TremoloNimbus`;
    }
  }

  updateCommentInput(e) {
    this.setState({ commentInput: e.currentTarget.value });
  }

  submitComment(e) {
    e.preventDefault();
    const commentData = {
      body: this.state.commentInput,
      author_id: this.props.currentUserId,
      track_id: this.props.track.id
    };
    this.props.createComment(commentData)
      .then(_ => {
        this.setState({ commentInput: "" })
      });
  }

  render() {
    const { track, comments, currentUserId } = this.props;
    const commentList = comments.length === 0 ? (
      <div className="empty-comments-container">
        <img src={window.chatNoCommentsURL} />
        <p id="no-comment-message1">
          Seems a little quiet over here
        </p>
        <p id="no-comment-message2">
          Be the first to comment on this track
        </p>
      </div>
    ) : (
      <div className="comment-list">
        <div className="comment-header">
            <img src={window.chatURL} />
          <p>
            {`${comments.length} comment${comments.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {comments.map(({ id, body, user }) => (
          <div className="comment" key={id}>
            <div
              className="comment-picture"
              style={{ "backgroundImage": generateProfilePicture(user.id) }}
            />
            <div className="comment-except-picture">
              <div className="comment-layer">
                <p className="comment-username">
                  <Link to={`/users/${user.id}`}>
                    {user.username}
                  </Link>
                </p>
              </div>
              <div className="comment-layer">
                <p className="comment-body">
                  {body}
                </p>
                {currentUserId !== user.id ? (
                  <div></div>
                ) : (
                  <button
                  className="delete-comment-button"
                  onClick={() => this.props.deleteComment(id)}
                >
                  <img src={window.trashBlackURL} />
                </button>
                )}
              </div>
            </div>
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
          <div className="comment-input-container">
            <div
              className="comment-input-picture"
              style={{ "backgroundImage": generateProfilePicture(currentUserId) }}
            />
            <form onSubmit={currentUserId ? this.submitComment : (
              e => {
                e.preventDefault();
                this.props.openModal('login');
              }
            )}>
              <input
                type="text"
                placeholder="Write a comment"
                className="comment-input"
                value={this.state.commentInput}
                onChange={this.updateCommentInput}
              />
            </form>
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