import { connect } from 'react-redux';
import Splash from "./splash";
import { openModal } from "../../actions/modal_actions";
import { fetchSplashTracks } from "../../actions/track_actions";

const mStP = ({ entities }) => {
  const allTracks = Object.values(entities.tracks);
  const startPos = Math.floor(Math.random() * (allTracks.length - 3));
  return {
    tracks: allTracks.slice(startPos,startPos + 3)
  }
}

const mDtP = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    fetchTracks: () => dispatch(fetchSplashTracks())
  }
}

export default connect(mStP, mDtP)(Splash);