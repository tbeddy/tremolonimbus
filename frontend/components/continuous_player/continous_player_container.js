import { connect } from 'react-redux';
import ContinuousPlayer from './continuous_player';
import {
  playTrack,
  pauseTrack,
  clearTrack,
  toggleLoop,
  changeVolume,
  toggleMute
} from '../../actions/audio_actions';

const mStP = ({ session, audio, entities }) => {
  const track = entities.tracks[audio.id];
  return {
    id: audio.id,
    isCurrentUsersTrack: track && session.id === track.uploader_id,
    playing: audio.playing,
    currentTime: audio.currentTime,
    volume: audio.muted ? 0.0 : audio.volume,
    looping: audio.looping,
    track: track,
    uploader: track ? entities.users[track.uploader_id] : null
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    clearTrack: () => dispatch(clearTrack()),
    toggleLoop: () => dispatch(toggleLoop()),
    changeVolume: volume => dispatch(changeVolume(volume)),
    toggleMute: () => dispatch(toggleMute()),
    updateTrack: track => dispatch(updateTrack(track)) 
  }
};

export default connect(mStP, mDtP)(ContinuousPlayer);