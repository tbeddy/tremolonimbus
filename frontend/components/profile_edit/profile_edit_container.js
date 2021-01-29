import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import ProfileEditForm from './profile_edit_form';

const mStP = ({ session, entities }) => {
  const user = entities.users[session.id];
  const {
    id, username, displayname, firstname, lastname,
    city, country, profile_image
  } = user;
  return {
    id,
    username,
    displayname: displayname ?? username,
    firstname: firstname ?? "",
    lastname: lastname ?? "",
    city: city ?? "",
    country: country ?? "",
    profileImage: profile_image ?? null
  }
}

const mDtP = (dispatch, ownProps) => {
  return {
    updateUser: (user, id) => dispatch(updateUser(user, id)),
    cancelAction: () => dispatch(ownProps.disappearAndCloseModal)
  }
};

export default connect(mStP, mDtP)(ProfileEditForm);