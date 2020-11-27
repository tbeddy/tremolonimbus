import { connect } from 'react-redux';
import TrackPagePlayer from './track_page_player';
import {
  playTrack,
  pauseTrack,
  clearTrack
} from '../../actions/audio_actions';
import {
  deleteTrack,
  raisePlayCount
} from '../../actions/track_actions';

const mStP = ({ session, audio }, ownProps) => {
  return {
    isCurrentUsersTrack: session.id === ownProps.uploader_id,
    currentTrackId: audio.id,
    isCurrentTrack: ownProps.id === audio.id,
    playing: audio.playing && ownProps.id === audio.id,
    currentTime: audio.currentTime
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    deleteTrack: trackId => dispatch(deleteTrack(trackId)),
    clearTrack: () => dispatch(clearTrack()),
    raisePlayCount: track => dispatch(raisePlayCount(track))
  }
}

export default connect(mStP, mDtP)(TrackPagePlayer);