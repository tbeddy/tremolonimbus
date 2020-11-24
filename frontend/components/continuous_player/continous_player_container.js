import { connect } from 'react-redux';
import ContinuousPlayer from './continuous_player';
import {
  playTrack,
  pauseTrack,
  clearTrack
} from '../../actions/audio_actions';

const mStP = ({ audio, entities }) => {
  const track = entities.tracks[audio.id];
  return {
    id: audio.id,
    playing: audio.playing,
    currentTime: audio.currentTime,
    track: track
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    clearTrack: () => dispatch(clearTrack())
  }
};

export default connect(mStP, mDtP)(ContinuousPlayer);