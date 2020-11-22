import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/track_actions';
import Stream from './stream';

const mStP = state => {
  return {
    tracks: Object.values(state.entities.tracks)
  }
}

const mDtP = dispatch => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  }
}

export default connect(mStP, mDtP)(Stream);