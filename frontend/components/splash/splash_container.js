import { connect } from 'react-redux';
import Splash from "./splash";
import { openModal } from "../../actions/modal_actions";

const mDtP = dispath => {
  return {
    openModal: modal => dispath(openModal(modal))
  }
}

export default connect(null, mDtP)(Splash);