import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { openModal } from '../../actions/modal_actions';
import ProfilePage from './profile_page';
import { selectTracksforUser } from '../../util/selectors';

const mStP = (state, ownProps) => {
  const id = ownProps.match.params.userId;
  return {
    id,
    user: state.entities.users[id],
    tracks: selectTracksforUser(state.entities, id).sort((a, b) => b.id - a.id),
    currentUserId: state.session.id
  }
}

const mDtP = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    openModal: modal => dispatch(openModal(modal))
  }
}

export default connect(mStP, mDtP)(ProfilePage);