import { connect } from 'react-redux';
import Greeting from "./greeting";
import { logout } from "../../actions/session_actions";

const mStP = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.id]
  }
}

const mDtP = dispath => {
  return {
    logout: () => dispath(logout())
  }
}

export default connect(mStP, mDtP)(Greeting);