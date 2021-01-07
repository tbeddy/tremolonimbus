import React from 'react';
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
        <p>{`${comments.length} comment${comments.length === 1 ? "" : "s"}`}</p>
        {comments.map(({ id, body, user }) => (
          <div key={id}>
            <p>{user.username}: {body}
              <span> {this.props.currentUser !== user.id ? null : (
                <button onClick={() => this.props.deleteComment(id)}>
                  Delete
                </button>
              )}</span>
            </p>
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
          <div className="comment-input">
            <form onSubmit={this.submitComment}>
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