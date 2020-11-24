import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/track_actions';
import Stream from './stream';

const mStP = state => {
  // Puts tracks in reverse order
  return {
    tracks: Object.values(state.entities.tracks).sort((a, b) => b.id - a.id)
  }
}

const mDtP = dispatch => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  }
}

export default connect(mStP, mDtP)(Stream);