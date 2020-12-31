import { connect } from 'react-redux';
import Splash from "./splash";
import { openModal } from "../../actions/modal_actions";
import { fetchSplashTracks } from "../../actions/track_actions";

const mStP = ({ entities }) => {
  return {
    tracks: Object.values(entities.tracks)
  }
}

const mDtP = dispath => {
  return {
    openModal: modal => dispath(openModal(modal)),
    fetchTracks: () => dispath(fetchSplashTracks())
  }
}

export default connect(mStP, mDtP)(Splash);