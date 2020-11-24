import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, clearSessionErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const mStP = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: 'signup'
  }
}

const mDtP = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  }
}

export default connect(mStP, mDtP)(SessionForm);