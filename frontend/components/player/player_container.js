import { connect } from 'react-redux';
import Player from './player';
import {
  playTrack,
  pauseTrack,
  clearTrack
} from '../../actions/audio_actions';
import {
  deleteTrack,
  updateTrack
} from '../../actions/track_actions';

const mStP = ({ session, audio, entities }, ownProps) => {
  return {
    isCurrentUsersTrack: session.id === ownProps.uploader_id,
    currentTrackId: audio.id,
    isCurrentTrack: ownProps.id === audio.id,
    playing: audio.playing && ownProps.id === audio.id,
    currentTime: audio.currentTime,
    uploader: entities.users[ownProps.uploader_id]
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    deleteTrack: trackId => dispatch(deleteTrack(trackId)),
    clearTrack: () => dispatch(clearTrack()),
    updateTrack: track => dispatch(updateTrack(track))
  }
}

export default connect(mStP, mDtP)(Player);