import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import TrackPage from '../track_page/track_page';
import { selectCommentsforTrack } from '../../util/selectors';

const mStP = ({ entities }, ownProps) => {
  const trackId = ownProps.match.params.trackId;
  return {
    track: entities.tracks[trackId] || {},
    comments: selectCommentsforTrack(entities, trackId)
  }
}

const mDtP = dispatch => {
  return {
    fetchTrack: trackId => dispatch(fetchTrack(trackId))
  }
}

export default connect(mStP, mDtP)(TrackPage);