import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions';

const mStP = (state, ownProps) => {
  return {
    errors: state.errors,
    formType: 'signup'
  }
}

const mDtP = (dispatch, ownProps) => {
  return {
    processForm: (user) => dispatch(signup(user))
  }
}

export default connect(mStP, mDtP)(SessionForm);