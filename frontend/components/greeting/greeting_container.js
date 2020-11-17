import { connect } from 'react-redux';
import Greeting from "./greeting";
import { openModal } from "../../actions/modal_actions";
import { logout } from "../../actions/session_actions";

const mStP = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.id]
  }
}

const mDtP = dispath => {
  return {
    logout: () => dispath(logout()),
    openModal: modal => dispath(openModal(modal))
  }
}

export default connect(mStP, mDtP)(Greeting);