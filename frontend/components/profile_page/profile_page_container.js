import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import ProfilePage from './profile_page';

const mStP = (state, ownProps) => {
  // Puts tracks in reverse order
  return {
    id: ownProps.match.params.userId,
    tracks: Object.values(state.entities.tracks).sort((a, b) => b.id - a.id)
  }
}

const mDtP = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mStP, mDtP)(ProfilePage);