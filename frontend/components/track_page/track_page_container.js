import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import {
  createComment,
  deleteComment
} from '../../actions/comment_actions';
import { openModal } from "../../actions/modal_actions";
import TrackPage from '../track_page/track_page';
import { selectCommentsforTrack } from '../../util/selectors';

const mStP = ({ entities, session }, ownProps) => {
  const trackId = ownProps.match.params.trackId;
  const track = entities.tracks[trackId];
  return {
    track: track || {},
    comments: selectCommentsforTrack(entities, trackId),
    uploader: track ? entities.users[track.uploader_id] : null,
    currentUserId: session.id,
    currentUser: entities.users[session.id]
  }
}

const mDtP = dispatch => {
  return {
    fetchTrack: trackId => dispatch(fetchTrack(trackId)),
    createComment: comment => dispatch(createComment(comment)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    openModal: modal => dispatch(openModal(modal))
  }
}

export default connect(mStP, mDtP)(TrackPage);