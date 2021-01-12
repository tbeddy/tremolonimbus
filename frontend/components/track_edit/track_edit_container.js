import { connect } from 'react-redux';
import { updateTrack } from '../../actions/track_actions';
import TrackEditForm from './track_edit_form';

const mStP = ({ session, entities }, ownProps) => {
  const track = entities.tracks[ownProps.id];
  return {
    currentUserId: session.id,
    title: !track ? "" : track.title,
    description: !track.description ? "" : track.description
  }
}

const mDtP = (dispatch, ownProps) => {
  return {
    updateTrack: (track, id) => dispatch(updateTrack(track, id))
  }
};

export default connect(mStP, mDtP)(TrackEditForm);