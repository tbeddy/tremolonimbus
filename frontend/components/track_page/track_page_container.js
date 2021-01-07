import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import {
  createComment,
  deleteComment
} from '../../actions/comment_actions';
import TrackPage from '../track_page/track_page';
import { selectCommentsforTrack } from '../../util/selectors';

const mStP = ({ entities, session }, ownProps) => {
  const trackId = ownProps.match.params.trackId;
  return {
    track: entities.tracks[trackId] || {},
    comments: selectCommentsforTrack(entities, trackId),
    currentUser: session.id
  }
}

const mDtP = dispatch => {
  return {
    fetchTrack: trackId => dispatch(fetchTrack(trackId)),
    createComment: comment => dispatch(createComment(comment)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  }
}

export default connect(mStP, mDtP)(TrackPage);