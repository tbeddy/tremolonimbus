import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const mStP = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: 'login'
  }
}

const mDtP = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mStP, mDtP)(SessionForm);