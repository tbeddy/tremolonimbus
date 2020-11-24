import { connect } from 'react-redux';
import ContinuousPlayer from './continuous_player';
import {
  playTrack,
  pauseTrack,
  clearTrack,
  toggleLoop
} from '../../actions/audio_actions';

const mStP = ({ audio, entities }) => {
  const track = entities.tracks[audio.id];
  return {
    id: audio.id,
    playing: audio.playing,
    currentTime: audio.currentTime,
    looping: audio.looping,
    track: track
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    clearTrack: () => dispatch(clearTrack()),
    toggleLoop: () => dispatch(toggleLoop())
  }
};

export default connect(mStP, mDtP)(ContinuousPlayer);