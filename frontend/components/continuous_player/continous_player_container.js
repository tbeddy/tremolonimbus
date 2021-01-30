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
import { fetchTrack } from '../../actions/track_actions';

const mStP = ({ session, audio, entities }) => {
  const track = entities.tracks[audio.id];
  const uploader = track ? entities.users[track.uploader_id] : null;
  const image = track ? (track.image ?? (uploader ? uploader.profileImage : null)) : null
  return {
    id: audio.id,
    isCurrentUsersTrack: track && session.id === track.uploader_id,
    playing: audio.playing,
    currentTime: audio.currentTime,
    volume: audio.muted ? 0.0 : audio.volume,
    looping: audio.looping,
    muted: audio.muted,
    track,
    uploader,
    image
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
    updateTrack: track => dispatch(updateTrack(track)),
    fetchTrack: trackId => dispatch(fetchTrack(trackId))
  }
};

export default connect(mStP, mDtP)(ContinuousPlayer);