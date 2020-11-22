import { connect } from 'react-redux';
import { createTrack } from '../../actions/track_actions';
import Upload from './upload';

const mStP = ({ session }) => {
  return {
    currentUserId: session.id
  }
}

const mDtP = dispatch => {
  return {
    createTrack: track => dispatch(createTrack(track))
  }
};

export default connect(mStP, mDtP)(Upload);