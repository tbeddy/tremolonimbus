import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import LoginFormContainer from '../form/login_form_container';
import SignupFormContainer from '../form/signup_form_container';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modal, closeModal } = this.props;
    if (!modal) {
      return null;
    }
    let component;
    switch (modal) {
      case 'login':
        component = <LoginFormContainer />;
        break;
      case 'signup':
        component = <SignupFormContainer />;
        break;
      default:
        return null;
    }
    return (
      <div>
        <a id="modal-x-out" onClick={closeModal}>×</a>
        <div className="modal-background background-fade-in" onClick={closeModal}>
          <div className="modal-child modal-descend"
               onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
      </div>
    )
  }
}

const mStP = state => {
  return {
    modal: state.ui.modal
  };
};

const mDtP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mStP, mDtP)(Modal);