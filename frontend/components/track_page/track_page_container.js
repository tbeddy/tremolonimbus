import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import TrackPage from '../track_page/track_page';

const mStP = ({ entities }, ownProps) => {
  return {
    track: entities.tracks[ownProps.match.params.trackId] || {}
  }
}

const mDtP = dispatch => {
  return {
    fetchTrack: trackId => dispatch(fetchTrack(trackId))
  }
}

export default connect(mStP, mDtP)(TrackPage);