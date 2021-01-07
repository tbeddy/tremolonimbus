import React from 'react';
import { Link } from 'react-router-dom';
import TrackPagePlayerContainer from './track_page_player_container'

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
    if (Object.keys(this.props.track).length === 0) {
      this.props.fetchTrack(this.props.match.params.trackId);
    }
  }

  updateCommentInput(e) {
    this.setState({ commentInput: e.currentTarget.value });
  }

  submitComment(e) {
    e.preventDefault();
    const commentData = {
      body: this.state.commentInput,
      author_id: this.props.currentUser,
      track_id: this.props.track.id
    };
    this.props.createComment(commentData)
      .then(_ => {
        this.setState({ commentInput: "" })
      });
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
        <div className="comment-header">
            <img src={window.chatURL} />
          <p>
            {`${comments.length} comment${comments.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {comments.map(({ id, body, user }) => (
          <div className="comment" key={id}>
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
              {this.props.currentUser !== user.id ? (
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
            <form className="comment-input" onSubmit={this.submitComment}>
              <input
                type="text"
                placeholder="Write a comment"
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