import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import LoginFormContainer from '../form/login_form_container';
import SignupFormContainer from '../form/signup_form_container';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalBackgroundClassName: "background-fade-in",
      modalChildClassName: "modal-descend"
    }

    this.disappearAndCloseModal = this.disappearAndCloseModal.bind(this);
  }

  disappearAndCloseModal() {
    this.setState({
      modalBackgroundClassName: "background-fade-out",
      modalChildClassName: "modal-ascend"
    }, () => setTimeout(() => {
      this.props.closeModal();
      this.setState({
        modalBackgroundClassName: "background-fade-in",
        modalChildClassName: "modal-descend"
      });
    }, 600))
  }

  render() {
    const { modal } = this.props;
    if (!modal) {
      return null;
    }
    let component;
    switch (modal) {
      case 'login':
        component = <LoginFormContainer
          disappearAndCloseModal={this.disappearAndCloseModal}/>;
        break;
      case 'signup':
        component = <SignupFormContainer
          disappearAndCloseModal={this.disappearAndCloseModal}/>;
        break;
      default:
        return null;
    }
    return (
      <div>
        <a id="modal-x-out" onClick={this.disappearAndCloseModal}>×</a>
        <div className={`modal-background ${this.state.modalBackgroundClassName}`}
             onClick={this.disappearAndCloseModal}>
          <div className={`modal-child ${this.state.modalChildClassName}`}
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