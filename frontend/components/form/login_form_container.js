import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';

const mStP = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: 'login'
  }
}

const mDtP = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(login(user))
  }
}

export default connect(mStP, mDtP)(SessionForm);